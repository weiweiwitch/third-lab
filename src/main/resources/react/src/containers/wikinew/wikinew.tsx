import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Form, Input, Row, Col} from "antd";
import {Tabs} from 'antd';
import {bindActionCreators} from "redux";
import * as hljs from "highlight.js";
import * as MarkdownIt from 'markdown-it';
import {styles} from "../../client";
import {clearCreateMark, addPost} from "../../sagas/posts";

const TabPane = Tabs.TabPane;
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
	pushState(nextLocation: any);
	clearCreateMark();
	addPost(data: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		createSuccess: state.wikiposts.createSuccess
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
		clearCreateMark: clearCreateMark,
		addPost: addPost,
	}, dispatch)
};

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
		if (nextProps.createSuccess === true) {
			console.info('wikinew switch to index');
			this.props.pushState('/wiki/wikiindex');
		}
	}

	updateTitle = (event) => {
		this.setState({postTitle: event.target.value});
	};

	updateText = (event) => {
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
			user: '',
			title: this.state.postTitle,
			postText: this.state.postText,
			parantId: this.state.parentId,
		};
		this.props.addPost(post);
	};

	cancelCreate = (event) => {
		event.preventDefault();

		this.props.pushState('/wiki/wikiindex');
	};

	render() {
		const postText = {__html: md.render(this.state.postText)};

		const formItemLayout = {
			labelCol: {span: 2},
			wrapperCol: {span: 18},
		};
		const formItemLayout2 = {
			labelCol: {span: 0},
			wrapperCol: {span: 24},
		};

		return (
			<Row>
				<Col span={24}>
					<Form>

						<Row>
							<Col span={24}>
								<Input placeholder="请输入标题"
									   onChange={this.updateTitle}
									   value={this.state.postTitle}
								/>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<Tabs defaultActiveKey="1">
									<TabPane tab="Markdown" key="1">
										<FormItem {...formItemLayout2}>
											<Input style={styles.codeStyle} type="textarea" autosize
												   className="edit-text textarea-height"
												   placeholder="内容" onChange={this.updateText}
												   value={this.state.postText}
											/>
										</FormItem>
									</TabPane>
									<TabPane tab="预览" key="2">
										<div className="inner_topic markdown-text textarea-height"
											 dangerouslySetInnerHTML={postText}></div>
									</TabPane>
								</Tabs>
							</Col>
						</Row>

						<Row>
							<Col span={12}>
								<Button type="primary" onClick={this.createPost}>新建</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WikiNew);