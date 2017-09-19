import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {Button, Col, Form, Input, Row, Tabs} from "antd";
import {bindActionCreators} from "redux";
import * as hljs from "highlight.js";
import * as MarkdownIt from 'markdown-it';
import {match, withRouter} from "react-router";
import {styles} from "../../client";
import {addPost, clearCreateMark} from "../../sagas/posts";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const md = new MarkdownIt({
	html: true,
	highlight:  (str: any, lang: any): any => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (e) {
				//console.info(e);
			}
		}

		return ''; // use external default escaping
	},
});

interface IStateProps {
	history: History;
	match: match<any>;
	createSuccess: boolean;
}

interface IDispatchProps {
	clearCreateMark(): any;
	addPost(data: any): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		createSuccess: state.wikiposts.createSuccess,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		clearCreateMark,
		addPost,
	}, dispatch);
};

class WikiNew extends React.Component<IAppProps, any> {

	constructor(props: IAppProps) {
		super(props);

		this.state = {
			parentId: parseInt(this.props.match.params.parentId, 10),
			postTitle: '',
			postText: '',
		};
	}

	componentDidMount(): any {
		this.props.clearCreateMark();
	}

	componentWillReceiveProps(nextProps: IAppProps): any {
		// 当将会接收到属性时处理
		if (nextProps.createSuccess === true) {
			this.props.history.push('/wiki/wikiindex');
		}
	}

	updateTitle = (event: any): any => {
		this.setState({postTitle: event.target.value});
	};

	updateText = (event: any): any => {
		let text = event.target.value;
		if (text === null) {
			text = '';
		}
		this.setState({postText: text});
	};

	createPost = (event: any): any => {
		event.preventDefault();
		const post = {
			id: 0,
			user: '',
			title: this.state.postTitle,
			postText: this.state.postText,
			parentId: this.state.parentId,
		};
		this.props.addPost(post);
	};

	cancelCreate = (event: any): any => {
		event.preventDefault();

		this.props.history.push('/wiki/wikiindex');
	};

	render(): any {
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
											<Input style={styles.codeStyle} type="textarea"
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
								<Button onClick={(event: any): any => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WikiNew));