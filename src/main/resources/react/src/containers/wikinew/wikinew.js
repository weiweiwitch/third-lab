import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const marked = require('marked');
import * as hljs from 'highlight.js';

import {clearCreateMark, addPost} from '../../redux/modules/wikiposts';

require('./wikiNew.scss');

@connect(
  state => ({
    createSuccess: state.wikiposts.createSuccess
  }),
  {
    clearCreateMark: clearCreateMark,
    addPost: addPost,
    pushState: push
  }
)
export default class WikiNew extends Component {

  static propTypes = {
    params: PropTypes.object,
    clearCreateMark: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    console.info('parentId: ' + this.props.params.parentId);
    this.state = {
      parentId: parseInt(this.props.params.parentId, 10),
      postTitle: '',
      postText: ''
    };
  }

  componentDidMount() {
    this.props.clearCreateMark();
  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    console.info('wikinew componentWillReceiveProps');
    console.info(nextProps);
    if (nextProps.createSuccess === true) {
      console.info('wikinew switch to index');
      this.props.pushState('/wiki/wikiindex');
    }
  }

  updateParentId = (event) => {
    console.info(event);
    this.setState({parentId: event.target.value});
  };

  updateTitle = (event) => {
    console.info(event);
    this.setState({postTitle: event.target.value});
  };

  updateText = (event) => {
    console.info(event.target.value);
    let text = event.target.value;
    if (text === null) {
      text = '';
    }
    this.setState({postText: text});
  };

  createPost = (event) => {
    event.preventDefault();
    const post = {
      id: 0,
      _id: 0,
      user: '',
      title: this.state.postTitle,
      postText: this.state.postText,
      audio: '',
      parantId: this.state.parentId,
      parant: '',
    };
    this.props.addPost(post);
  };

  cancelCreate = (event) => {
    event.preventDefault();

    if (this.state.parentId !== 0) {
      this.props.pushState('/wiki/wikipost/' + this.state.parentId);
    } else {
      this.props.pushState('/wiki/wikiindex');
    }
  };

  render() {
    marked.setOptions({
      highlight: (code, lang, callback) => {
        console.log('try hightlight ' + lang);
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
    const postText = {__html: marked(this.state.postText)};

    return (
      <div className="row">
        <div className="col-md-12">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-md-8">
                <TextField hintText="请输入标题" floatingLabelText="标题"
                           onChange={(event)=> {
                             this.updateTitle(event);
                           }} value={this.state.postTitle}
                />
              </div>
              <div className="col-md-1">
                <TextField type="number"
                           hintText="请输入上层ID" floatingLabelText="父ID"
                           onChange={(event)=> {
                             this.updateParentId(event);
                           }} value={this.state.parentId}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <TextField multiLine={true} className="edit-text wikicreatearea-height" fullWidth={true}
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
              <div className="col-md-12">
                <RaisedButton label="新建" primary={true} onClick={(event) => {
                  this.createPost(event);
                }}/>
                <RaisedButton label="取消" onClick={(event) => {
                  this.cancelCreate(event);
                }}/>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
