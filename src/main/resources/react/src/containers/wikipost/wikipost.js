import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
const marked = require('marked');
import * as hljs from 'highlight.js';

import {querySpecPost} from '../../redux/modules/wikispecpost';
import {deletePost} from '../../redux/modules/wikiposts';

require('./wikiPost.scss');

@connect(
  state => ({
    wikipost: state.wikispecpost.wikipost,
    dirty: state.wikiposts.dirty
  }),
  {
    querySpecPost: querySpecPost,
    deletePost: deletePost,
    pushState: push
  }
)
export default class WikiPost extends Component {
  static propTypes = {
    params: PropTypes.object,
    wikipost: PropTypes.object.isRequired,
    querySpecPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.info('WikiPost componentDidMount');

    // 查询账号列表
    const postId = parseInt(this.props.params.pId, 10);

    // 查询特定文章
    this.props.querySpecPost(postId);
  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    console.info('WikiPost componentWillReceiveProps');
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
    console.info('call marked');
    const postText = {__html: marked(post.postText)};
    console.info(postText);

    return (
      <div className="row">
        <div className="col-md-12">
          {/* 编辑栏 */}
          <div className="row">
            <div className="col-md-11">
              <RaisedButton label="编辑" primary={true} onClick={(event) => {
                this.edit();
              }}/>
              <RaisedButton label="添加子文章" onClick={(event) => {
                this.createSubPost();
              }}/>
              <RaisedButton label="首页" onClick={(event) => {
                this.transToIndex();
              }}/>
            </div>
            <div className="col-md-1">
              <RaisedButton label="删除" onClick={(event) => {
                this.deletePost();
              }}/>
            </div>
          </div>
          {/* 文章内容 */}
          <div className="row">
            <div className="col-md-10 inner_topic_container">
              <div className="topic_header">
                <span className="topic_full_title">{post.title}</span>
              </div>
              <div className="inner_topic">
                <div className="markdown-text" dangerouslySetInnerHTML={postText}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
