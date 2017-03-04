import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Radio, Icon} from 'antd';
import {Row, Col, Form, Input} from 'antd';
import * as hljs from "highlight.js";
import {chgPost, clearModifyMark} from "../../redux/modules/wikispecpost";
import {queryPosts} from "../../redux/modules/wikiposts";
import {styles} from "../../client";
import {bindActionCreators} from "redux";

const FormItem = Form.Item;

const marked = require('marked');

interface StateProps {
  wikipost: any,
  modifySuccess: boolean,
}

interface DispatchProps {
  chgPost(postId: number, post: any);
  clearModifyMark();
  queryPosts();
  pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {
    wikipost: state.wikispecpost.wikipost,
    modifySuccess: state.wikispecpost.modifySuccess
  };
}

class WikiEdit extends React.Component<AppProps, any> {

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

    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 18},
    };

    return (
      <Row>
        <Col span={24}>
          <Form>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="标题">
                  <Input placeholder="请输入标题"
                         onChange={(event)=> {
                           this.updateTitle(event);
                         }} value={this.state.postTitle}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="ID">
                  <Input type="number" placeholder="ID"
                         disabled={true} defaultValue={post.id}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="上层ID">
                  <Input type="number" placeholder="请输入上层ID" onChange={this.updateParentId}
                         value={this.state.postParentId}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="内容">
                  <Input style={styles.codeStyle} type="textarea" autosize className="edit-text textarea-height"
                         placeholder="内容" onChange={this.updateText} value={this.state.postText}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <div className="col-md-6 inner_topic">
                  <div className="markdown-text textarea-height" dangerouslySetInnerHTML={postText}></div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={12} offset={1}>
                <Button type="primary" onClick={this.confirmModify}>更新</Button>
                <Button onClick={this.cancelModify}>取消</Button>
              </Col>
            </Row>

          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({
    chgPost: chgPost,
    clearModifyMark: clearModifyMark,
    queryPosts: queryPosts,
    pushState: push
  }, dispatch)
})(WikiEdit);