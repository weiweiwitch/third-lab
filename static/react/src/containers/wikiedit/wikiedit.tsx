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
	wikipost: any;
	wikitaglist: any[];
}

interface IDispatchProps {
	chgPost(postId: number, post: any): any;

	showPost(postId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		wikipost: state.wikispecpost.wikipost,
		wikitaglist: state.wikitags.wikitaglist,
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
	maxTagId: number;
	postTags: any[];
	tagSearchResult: any[];
	selectedTag: string;
	inputTag: string;
}

class WikiEdit extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		let maxTagId = 0;
		const tags = props.wikipost.tags.map((tag: any) => {
			if (tag.id > maxTagId) {
				maxTagId = tag.id;
			}
			return {
				id: tag.id,
				tagName: tag.tagName,
			};
		});

		this.state = {
			postTitle: props.wikipost.title,
			postText: props.wikipost.postText,
			postParentId: props.wikipost.parentId,
			maxTagId,
			postTags: tags,
			tagSearchResult: [],
			selectedTag: '',
			inputTag: '',
		};
	}

	componentWillReceiveProps(nextProps: IAppProps): any {
		// 更新tag表
		const tags = nextProps.wikipost.tags.map((tag: any) => {
			return {
				id: tag.id,
				tagName: tag.tagName,
			};
		});
		this.setState({
			postTags: tags,
		});
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
		const postTags = [];
		this.state.postTags.map((postTag: any) => {
			postTags.push(postTag.tagName);
		});

		const updatedPost = {
			title: this.state.postTitle,
			postText: this.state.postText,
			parentId: this.state.postParentId,
			tags: postTags,
		};
		this.props.chgPost(postId, updatedPost);
	};

	cancelModify = (event: any): any => {
		event.preventDefault();

		const postId = this.props.wikipost.id;
		this.props.showPost(postId);
	};

	onTagSelect = (value: any): any => {
		this.setState({
			selectedTag: value,
		});
	};

	onTagSearch = (inputValue: any): any => {
		const searchResult = [];
		const existTagMap = new Map<string, boolean>();
		this.state.postTags.map((postTag: any) => {
			existTagMap[postTag.tagName] = true;
		});
		this.props.wikitaglist.filter((value: any, index: any) => {
			if (isNullOrUndefined(existTagMap[value.tagName]) === false) {
				return false;
			}
			if (value.tagName.indexOf(inputValue) === -1) {
				return false;
			}

			searchResult.push(value.tagName);
			return true;
		});

		this.setState({
			tagSearchResult: searchResult,
			inputTag: inputValue,
		});
	};

	onTagEnterPress = (event: any): any => {
		if (event.key === 'Enter') {
			// 按了回车
			const existTagMap = new Map<string, boolean>();
			this.state.postTags.map((postTag: any) => {
				existTagMap[postTag.tagName] = true;
			});

			let addNewTag = false;
			let newTagName = '';
			const selectedTag = this.state.selectedTag;
			if (selectedTag !== '') {
				// 判断这个tag是否已经存在
				if (isNullOrUndefined(existTagMap[selectedTag]) === false) {
					// 已经存在了
					return;
				}

				newTagName = selectedTag;
				addNewTag = true;

			} else {
				const inputTag = this.state.inputTag;
				if (inputTag !== '') {
					// 判断这个tag是否已经存在
					if (isNullOrUndefined(existTagMap[selectedTag]) === false) {
						// 已经存在了
						return;
					}

					newTagName = inputTag;
					addNewTag = true;
				}
			}

			if (addNewTag) {
				const newTagId = this.state.maxTagId + 1;
				const newTag = {
					id: newTagId,
					tagName: newTagName,
				};
				const nowTags = [...this.state.postTags];
				nowTags.push(newTag);

				this.setState({
					postTags: nowTags,
					maxTagId: newTagId,
					selectedTag: '', // 清空选择
					inputTag: '',
				});
			}
		}
	};

	tagClose = (tag: any): any => {
		const remainings = this.state.postTags.filter((record: any, index: any) => {
			if (record === tag) {
				return false;
			} else {
				return true;
			}
		});
		this.setState({
			postTags: remainings,
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

		const tags = this.state.postTags.map((tag: any) => {
			return (
				<Tag key={tag.id} closable afterClose={(): any => this.tagClose(tag)}>{tag.tagName}</Tag>
			);
		});

		const allTags = this.state.tagSearchResult;

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
								<AutoComplete
									allowClear={true}
									dataSource={allTags}
									style={{width: 200, padding: '0px 12px 0px 0px'}}
									onSelect={this.onTagSelect}
									onSearch={this.onTagSearch}
									placeholder="添加tag"
								>
									<input onKeyPress={this.onTagEnterPress}/>
								</AutoComplete>
								{tags}
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