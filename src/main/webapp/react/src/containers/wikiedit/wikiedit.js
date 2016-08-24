import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
const marked = require('marked');
import * as hljs from 'highlight.js';

import {querySpecPost} from '../../redux/modules/wikispecpost';
import {chgPost, clearModifyMark} from '../../redux/modules/wikispecpost';

require('./wikiEdit.scss');

@connect(
  state => ({
    wikipost: state.wikispecpost.wikipost,
    modifySuccess: state.wikispecpost.modifySuccess
  }),
  {
    chgPost: chgPost,
    clearModifyMark: clearModifyMark,
    querySpecPost: querySpecPost,
    pushState: push
  }
)
export default class WikiEdit extends Component {

  static propTypes = {
    wikipost: PropTypes.object.isRequired,
    chgPost: PropTypes.func.isRequired,
    clearModifyMark: PropTypes.func.isRequired,
    querySpecPost: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    console.info('constructor ' + props.wikipost.title);
    this.state = {
      postTitle: props.wikipost.title,
      postText: props.wikipost.postText
    };
  }

  componentDidMount() {
    console.info('componentDidMount ' + this.props.wikipost.title);

    this.props.clearModifyMark();
  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    console.info('wikiedit componentWillReceiveProps');
    console.info(nextProps);
    if (nextProps.modifySuccess === true) {
      // 修改成功, 切换到文章页, 并刷新
      const post = this.props.wikipost;
      this.props.pushState('/wiki/wikipost/' + post.id);

      this.props.querySpecPost(post.id);
    }
  }

  updateTitle = (event) => {
    console.info(event);
    this.setState({postTitle: event.target.value});
  };

  updateText = (event) => {
    console.info(event);
    this.setState({postText: event.target.value});
  };

  confirmModify = (event) => {
    event.preventDefault();

    const post = this.props.wikipost;

    const updatedPost = {
      id: post.id,
      _id: post.id,
      user: post.user,
      title: this.state.postTitle,
      postText: this.state.postText,
      audio: post.audio,
      parantId: post.parantId,
      parant: post.parant
    };
    this.props.chgPost(post.id, updatedPost);
  };

  cancelModify = (event) => {
    event.preventDefault();

    const post = this.props.wikipost;
    this.props.pushState('/wiki/wikipost/' + post.id);
  };

  render() {
    const post = this.props.wikipost;
    marked.setOptions({
      highlight: (code, lang, callback) => {
        console.log('try hightlight ' + lang);
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
    const postText = {__html: marked(this.state.postText)};

    return (
      <div className="row">
        <div className="col-md-12 form-horizontal">
          <div className="form-group">
            <div className="col-md-8">
              <input className="form-control" type="text" onChange={(event)=> {
                this.updateTitle(event);
              }} value={this.state.postTitle}/>
            </div>
            <label className="col-md-1 control-label">ID：</label>
            <div className="col-md-1">
              <input className="form-control" readOnly type="text" defaultValue={post.id}/>
            </div>
            <label className="col-md-1 control-label">上级：</label>
            <div className="col-md-1">
              <input className="form-control" type="text" defaultValue={post.parantId}/>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <textarea className="form-control wikieditarea-height edit-text" onChange={(event)=> {
                    this.updateText(event);
                  }} value={this.state.postText}/>
                </div>
                <div className="col-md-6 inner_topic">
                  <div className="markdown-text textarea-height" dangerouslySetInnerHTML={postText}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-3">
              <button onClick={(event)=> {
                this.confirmModify(event);
              }} className="btn btn-primary">更新
              </button>
              <button onClick={(event)=> {
                this.cancelModify(event);
              }} className="btn btn-default">取消
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
