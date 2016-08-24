import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {querySpecPost} from '../../redux/modules/wikispecpost';
import {queryPosts} from '../../redux/modules/wikiposts';

@connect(
  state => ({
    wikiposts: state.wikiposts.wikiposts,
    dirty: state.wikiposts.dirty
  }),
  {
    queryPosts: queryPosts,
    querySpecPost: querySpecPost,
    pushState: push
  }
)
export default class WikiTree extends Component {

  static propTypes = {
    wikiposts: PropTypes.array.isRequired,
    querySpecPost: PropTypes.func.isRequired,
    queryPosts: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      nodeExpands: new Map()
    };
  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    console.info('wikitree componentWillReceiveProps');
    console.info(nextProps);
    if (nextProps.dirty === true) {
      console.info('wikitree call queryPosts()');
      this.props.queryPosts();
    }
  }

  transferPost(postsFromServer, posts) {
    postsFromServer.map((eachPost) => {
      const node = {
        post: eachPost,
        expand: this.state.nodeExpands.get(eachPost.id) ? true : false,
        nodes: []
      };
      posts.push(node);

      if (eachPost.nodes !== null) {
        this.transferPost(eachPost.nodes, node.nodes);
      }
    });
  }

  createPost = () => {
    this.props.pushState('/wiki/wikinew/0');
  };

  // 点击节点后,展开或收缩
  expandNode = (nodeId) => {
    console.info('expandNode: ' + nodeId);
    let expand = true;
    if (this.state.nodeExpands.get(nodeId)) {
      expand = false;
    }

    const nodeExpands = new Map(this.state.nodeExpands);
    nodeExpands.set(nodeId, expand);
    this.setState({
      nodeExpands: nodeExpands
    });

    // 查询特定文章
    this.props.querySpecPost(nodeId);

    this.props.pushState('/wiki/wikipost/' + nodeId);
  };

  render() {
    const wikiposts = this.props.wikiposts;
    const posts = [];
    this.transferPost(wikiposts, posts);

    const subTreeProps = {
      wikiposts: posts,
      expandNode: this.expandNode
    };

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={(event) => {this.createPost(event);}}>创建</button>
          </div>
        </div>
        <div className="row main-auto-height">
          <WikiTreeContainer {...subTreeProps}/>
        </div>
      </div>
    );
  }
}

class WikiTreeContainer extends Component {

  static propTypes = {
    wikiposts: PropTypes.array.isRequired,
    expandNode: PropTypes.func.isRequired
  };

  render() {
    const posts = this.props.wikiposts.map((postNode) => {
      const postProps = {
        node: postNode,
        expandNode: this.props.expandNode
      };

      const subTreeProps = {
        wikiposts: postNode.nodes === null ? [] : postNode.nodes,
        expandNode: this.props.expandNode
      };

      // 是否展开
      const subNode = postNode.expand ? (
        <div>
          <WikiTreeContainer {...subTreeProps}/>
        </div>
      ) : (<div></div>);

      return (
        <li key={postNode.post.id}>
          <WikiPostNode {...postProps} className="labtree-node labtree-node-text"/>
          {subNode}
        </li>
      );
    });

    return (
      <div className="labtree">
        <ul className="labtree-nodes">
          {posts}
        </ul>
      </div>
    );
  }
}

class WikiPostNode extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    expandNode: PropTypes.func.isRequired
  };

  render() {
    const node = this.props.node;
    const expandNode = this.props.expandNode;
    return (
      <div>
        <span onClick={(event) => {
          expandNode(node.post.id);
        }}>{node.post.title}</span>
      </div>
    );
  }
}
