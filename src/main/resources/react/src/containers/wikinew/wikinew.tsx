import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Form, Input, Row, Col} from "antd";
import {bindActionCreators} from "redux";
import * as hljs from "highlight.js";
import * as MarkdownIt from 'markdown-it';
import {styles} from "../../client";
import {clearCreateMark, addPost} from "../../sagas/posts";

const FormItem = Form.Item;

const md = new MarkdownIt({
	html: true,
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (e) {
				console.info(e);
			}
		}

		return ''; // use external default escaping
	},
});

interface StateProps {
	createSuccess: boolean,
	params: any,
}

interface DispatchProps {
	clearCreateMark();
	addPost(data: any);
	pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {
		createSuccess: state.wikiposts.createSuccess
	};
}

class WikiNew extends React.Component<AppProps, any> {

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
		const postText = {__html: md.render(this.state.postText)};

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
									<Input placeholder="请输入标题" onChange={(event) => {
										this.updateTitle(event);
									}} value={this.state.postTitle}
									/>
								</FormItem>
							</Col>
							<Col span={12}>
								<FormItem {...formItemLayout} label="ID">
									<Input type="number" placeholder="请输入上层ID"
										   onChange={(event) => {
											   this.updateParentId(event);
										   }} value={this.state.parentId}
									/>
								</FormItem>
							</Col>
						</Row>

						<Row>
							<Col span={12}>
								<FormItem {...formItemLayout} label="内容">
									<Input style={styles.codeStyle} type="textarea"
										   className="edit-text textarea-height" autosize
										   placeholder="内容" onChange={(event) => {
										this.updateText(event);
									}} value={this.state.postText}
									/>
								</FormItem>
							</Col>
							<Col span={12}>
								<div className="markdown-text textarea-height" dangerouslySetInnerHTML={postText}></div>
							</Col>
						</Row>

						<Row>
							<Col span={12} offset={1}>
								<Button type="primary" onClick={(event) => {
									this.createPost(event);
								}}>新建</Button>
								<Button onClick={(event) => {
									this.cancelCreate(event);
								}}>取消</Button>
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
		clearCreateMark: clearCreateMark,
		addPost: addPost,
		pushState: push,
	}, dispatch)
})(WikiNew);