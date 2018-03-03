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
import {IPostData, WikiPostsState} from "../../redux/modules/wikiposts";

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
	posts: IPostData[];
	wikipost: SpecPostData;
	wikitaglist: WikiTagData[];
}

interface IDispatchProps {
	chgPost(postId: number, post: any): any;

	showPost(postId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	const wikiposts: WikiPostsState = state.wikiposts;
	const wikispecpost: WikiSpecPostState = state.wikispecpost;
	const wikitags: WikiTagsState = state.wikitags;

	return {
		posts: wikiposts.wikiposts,
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
	postTag: WikiTagData;

	parentPost: IPostData;
	showedParentPost: any[];
	parentPostSearchResult: any[];
	selectedParentPost: string;
	inputPost: string;
}

class WikiEdit extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		// 所属标签
		let postTag = new WikiTagData();
		const postTagId = props.wikipost.tagId;
		props.wikitaglist.map((tag: any) => {
			if (tag.id === postTagId) {
				postTag = tag;
			}
		});

		// 上级文章
		let parentPost = null;
		let showedParentPost = [];
		if (props.wikipost.parentId > 0) {
			props.posts.map((post: IPostData): any => {
				if (post.id === props.wikipost.parentId) {
					parentPost = post;
					showedParentPost = [post];
				}
			});
		}

		this.state = {
			postTitle: props.wikipost.title,
			postText: props.wikipost.postText,
			postTag,

			parentPost,
			showedParentPost,
			parentPostSearchResult: [],
			selectedParentPost: '',
			inputPost: '',
		};
	}

	updateTitle = (event: any): any => {
		this.setState({postTitle: event.target.value});
	};

	updateText = (event: any): any => {
		this.setState({postText: event.target.value});
	};

	confirmModify = (event: any): any => {
		event.preventDefault();

		const postId = this.props.wikipost.id;
		const updatedPost = {
			title: this.state.postTitle,
			postText: this.state.postText,
			parentId: this.state.parentPost === null ? 0 : this.state.parentPost.id,
		};
		this.props.chgPost(postId, updatedPost);
	};

	cancelModify = (event: any): any => {
		event.preventDefault();

		const postId = this.props.wikipost.id;
		this.props.showPost(postId);
	};

	onPostSelect = (value: any): any => {
		this.setState({
			selectedParentPost: value,
		});
	};

	onPostSearch = (inputValue: any): any => {
		const searchResult = [];
		const existPostMap = new Map<string, boolean>();
		this.state.showedParentPost.map((post: IPostData) => {
			existPostMap[post.title] = true;
		});
		this.props.posts.filter((post: IPostData) => {
			if (isNullOrUndefined(existPostMap[post.title]) === false) {
				// 过滤掉已经添加给目标的标签
				return false;
			}
			if (post.tagId !== this.props.wikipost.tagId) {
				// 过滤掉不属于一个标签的
				return false;
			}
			if (post.title.indexOf(inputValue) === -1) {
				// 过滤掉总标签表中和当前输入不符的。
				return false;
			}

			searchResult.push(post.title);
			return true;
		});

		this.setState({
			parentPostSearchResult: searchResult,
			inputPost: inputValue,
		});
	};

	onPostEnterPress = (event: any): any => {
		if (event.key === 'Enter') {
			// 按了回车
			const existPostMap = new Map<string, number>();
			this.state.showedParentPost.map((post: IPostData) => {
				existPostMap[post.title] = post;
			});

			let newParentPost = null;
			let selectedNewParentPost = false;
			const selectedPostName = this.state.selectedParentPost;
			if (selectedPostName !== '') {
				// 判断这个post是否已经存在
				if (isNullOrUndefined(existPostMap[selectedPostName]) === false) {
					// 已经存在了
					return;
				}

				this.props.posts.map((post: IPostData): any => {
					if (post.title === selectedPostName) {
						newParentPost = post;
						selectedNewParentPost = true;
					}
				});
				if (selectedNewParentPost === false) {
					return;
				}

			} else {
				return;
			}

			this.setState({
				parentPost: newParentPost,
				showedParentPost: [newParentPost],
				selectedParentPost: '', // 清空选择
				inputPost: '',
			});
		}
	};

	postClose = (post: IPostData): any => {
		const remainings = this.state.showedParentPost.filter((record: any, index: any) => {
			return record === post ? false : true;
		});
		if (remainings.length > 0) {
			return;
		}

		this.setState({
			parentPost: null,
			showedParentPost: [],
		});
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

		const parentPosts = this.state.showedParentPost.map((post: IPostData) => {
			return (
				<Tag key={post.id} closable afterClose={(): any => this.postClose(post)}>{post.title}</Tag>
			);
		});

		const allPosts = this.state.parentPostSearchResult;

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
							<Col span={12}>
								<span>{this.state.postTag.tagName}</span>
							</Col>
							<Col span={12}>
								<AutoComplete
									allowClear={true}
									dataSource={allPosts}
									style={{width: 300, padding: '0px 12px 0px 0px'}}
									onSelect={this.onPostSelect}
									onSearch={this.onPostSearch}
									placeholder="选择上级"
								>
									<input onKeyPress={this.onPostEnterPress}/>
								</AutoComplete>
								{parentPosts}
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

export default connect(mapStateToProps, mapDispatchToProps)(WikiEdit);