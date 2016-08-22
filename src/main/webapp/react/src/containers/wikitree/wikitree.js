import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({
    wikiposts: state.wikiposts.wikiposts,
    dirty: state.wikiposts.dirty
  }),
  {}
)
export default class WikiTree extends Component {

  static propTypes = {
    wikiposts: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      nodeExpands: {}
    };
  }

  transferPost(postsFromServer, posts) {
    postsFromServer.map((eachPost) => {
      const node = {
        post: eachPost,
        expand: this.state.nodeExpands[eachPost.id] ? true : false,
        nodes: []
      };
      posts.push(node);

      if (eachPost.nodes !== null) {
        this.transferPost(eachPost.nodes, node.nodes);
      }
    });
  }

  expandNode = (nodeId) => {
    let expand = true;
    if (this.state.nodeExpands[nodeId]) {
      expand = false;
    }
    const nodeExpands = Object.assign(this.state.nodeExpands, {});
    nodeExpands[nodeId] = expand;
    this.setState({
      nodeExpands: nodeExpands
    });
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
            <button className="btn btn-primary">创建</button>
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
