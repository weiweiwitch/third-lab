import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const marked = require('marked');
import * as hljs from 'highlight.js';

import {chgPost, clearModifyMark} from '../../redux/modules/wikispecpost';
import {queryPosts} from '../../redux/modules/wikiposts';
import {styles} from '../../client';

require('./wikiEdit.scss');

@connect(
  state => ({
    wikipost: state.wikispecpost.wikipost,
    modifySuccess: state.wikispecpost.modifySuccess
  }),
  {
    chgPost: chgPost,
    clearModifyMark: clearModifyMark,
    queryPosts: queryPosts,
    pushState: push
  }
)
export default class WikiEdit extends Component {

  static propTypes = {
    wikipost: PropTypes.object.isRequired,
    chgPost: PropTypes.func.isRequired,
    clearModifyMark: PropTypes.func.isRequired,
    queryPosts: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    console.info('constructor ' + props.wikipost.title);
    this.state = {
      postTitle: props.wikipost.title,
      postText: props.wikipost.postText,
      postParentId: props.wikipost.parantId,
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

      // 由于可能的上下级改变,这里重新查询所有文章吧
      this.props.queryPosts();
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

  updateParentId = (event) => {
    console.info(event);
    this.setState({postParentId: event.target.value});
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
      parantId: parseInt(this.state.postParentId, 10),
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
              <TextField hintText="请输入标题" floatingLabelText="标题"
                         onChange={(event)=> {
                           this.updateTitle(event);
                         }} value={this.state.postTitle}
              />
            </div>
            <div className="col-md-2">
              <TextField type="number" hintText="" floatingLabelText="ID"
                         disabled={true} defaultValue={post.id}
              />
            </div>
            <div className="col-md-2">
              <TextField type="number" hintText="请输入上层ID" floatingLabelText="父ID"
                         onChange={(event)=> {
                           this.updateParentId(event);
                         }} value={this.state.postParentId}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <TextField textareaStyle={styles.codeStyle} multiLine={true} className="edit-text wikicreatearea-height" fullWidth={true}
                             underlineShow={false} hintText="" floatingLabelText="内容"
                             onChange={(event)=> {
                               this.updateText(event);
                             }} value={this.state.postText}
                  />
                </div>
                <div className="col-md-6 inner_topic">
                  <div className="markdown-text textarea-height" dangerouslySetInnerHTML={postText}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-3">
              <RaisedButton label="更新" primary={true} onClick={(event)=> {
                this.confirmModify(event);
              }}/>
              <RaisedButton label="取消" onClick={(event)=> {
                this.cancelModify(event);
              }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
