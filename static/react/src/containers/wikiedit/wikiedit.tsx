import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {AutoComplete, Button, Col, Form, Input, Row, Tabs, Tag} from "antd";
import * as hljs from "highlight.js";
import * as MarkdownIt from "markdown-it";
import {bindActionCreators} from "redux";
import {isNullOrUndefined} from "util";
import {withRouter} from "react-router";
import {chgPost, showPost} from "../../sagas/posts";
import {styles} from "../../client";
import {WikiTagData, WikiTagsState} from "../../redux/modules/wikitags";
import {SpecPostData, WikiSpecPostState} from "../../redux/modules/wikispecpost";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const md = new MarkdownIt({
	html: true,
	highlight: (str: any, lang: any): any => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (e) {
				// console.error(e);
			}
		}

		return ''; // use external default escaping
	},
});

interface IStateProps {
	history: History;
	wikipost: SpecPostData;
	wikitaglist: WikiTagData[];
}

interface IDispatchProps {
	chgPost(postId: number, post: any): any;

	showPost(postId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	const wikispecpost: WikiSpecPostState = state.wikispecpost;
	const wikitags: WikiTagsState = state.wikitags;

	return {
		wikipost: wikispecpost.wikipost,
		wikitaglist: wikitags.wikitaglist,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		chgPost,
		showPost,
	}, dispatch);
};

interface IState {
	postTitle: string;
	postText: string;
	postParentId: number;
	postTag: WikiTagData;
}

class WikiEdit extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		let postTag = new WikiTagData();
		const postTagId = props.wikipost.tagId;
		props.wikitaglist.map((tag: any) => {
			if (tag.id === postTagId) {
				postTag = tag;
			}
		});

		this.state = {
			postTitle: props.wikipost.title,
			postText: props.wikipost.postText,
			postParentId: props.wikipost.parentId,
			postTag,
		};
	}

	updateTitle = (event: any): any => {
		this.setState({postTitle: event.target.value});
	};

	updateText = (event: any): any => {
		this.setState({postText: event.target.value});
	};

	updateParentId = (event: any): any => {
		const postParentId = parseInt(event.target.value, 10);
		this.setState({postParentId});
	};

	confirmModify = (event: any): any => {
		event.preventDefault();

		const postId = this.props.wikipost.id;
		const updatedPost = {
			title: this.state.postTitle,
			postText: this.state.postText,
			parentId: this.state.postParentId,
		};
		this.props.chgPost(postId, updatedPost);
	};

	cancelModify = (event: any): any => {
		event.preventDefault();

		const postId = this.props.wikipost.id;
		this.props.showPost(postId);
	};

	render(): any {
		const post = this.props.wikipost;

		const postText = {__html: md.render(this.state.postText)};

		const formItemLayout = {
			labelCol: {span: 6},
			wrapperCol: {span: 14},
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
							<Col span={24} style={{padding: '12px 0px'}}>
								<Input placeholder="请输入标题"
									   onChange={this.updateTitle} value={this.state.postTitle}
								/>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<span>{this.state.postTag.tagName}</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WikiEdit));