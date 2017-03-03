import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Radio, Icon} from 'antd';
import * as hljs from "highlight.js";
import {Row, Col} from 'antd';
import {querySpecPost} from "../../redux/modules/wikispecpost";
import {deletePost} from "../../redux/modules/wikiposts";
import {bindActionCreators} from "redux";

require('./wikiPost.scss');

const marked = require('marked');

interface StateProps {
  params: any,
  wikipost: any,
  dirty: boolean,
}

interface DispatchProps {
  querySpecPost(postId: number);
  deletePost(postId: number);
  pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {
    wikipost: state.wikispecpost.wikipost,
    dirty: state.wikiposts.dirty
  };
}

class WikiPost extends React.Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 查询账号列表
    const postId = parseInt(this.props.params.pId, 10);

    // 查询特定文章
    this.props.querySpecPost(postId);
  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    if (nextProps.params.pId !== this.props.params.pId) {
      const postId = parseInt(nextProps.params.pId, 10);
      this.props.querySpecPost(postId);
    }
  }

  edit = () => {
    this.props.pushState('/wiki/wikiedit');
  };

  createSubPost = () => {
    const post = this.props.wikipost;
    this.props.pushState('/wiki/wikinew/' + post.id);
  };

  deletePost = () => {
    // 删除特定post
    const post = this.props.wikipost;
    this.props.deletePost(post.id);

    // 跳到首页
    this.props.pushState('/wiki/wikiindex');
  };

  transToIndex = () => {
    this.props.pushState('/wiki/wikiindex');
  };

  render() {
    const post = this.props.wikipost;

    marked.setOptions({
      highlight: (code, lang, callback) => {
        console.log('try hightlight ' + lang);
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
    const postText = {__html: marked(post.postText)};

    return (
      <Row>
        <Col span={24}>
          {/* 编辑栏 */}
          <Row>
            <Col span={22}>
              <Button type="primary" onClick={(event) => {
                this.edit();
              }}>编辑</Button>
              <Button onClick={(event) => {
                this.createSubPost();
              }}>添加子文章</Button>
              <Button onClick={(event) => {
                this.transToIndex();
              }}>首页</Button>
            </Col>
            <Col span={2}>
              <Button onClick={(event) => {
                this.deletePost();
              }}>删除</Button>
            </Col>
          </Row>
          {/* 文章内容 */}
          <Row>
            <Col span={24}>
              <div className="inner_topic_container">
                <div className="topic_header">
                  <span className="topic_full_title">{post.title}</span>
                </div>
                <div className="inner_topic">
                  <div className="markdown-text" dangerouslySetInnerHTML={postText}></div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({
    querySpecPost: querySpecPost,
    deletePost: deletePost,
    pushState: push
  }, dispatch)
})(WikiPost);