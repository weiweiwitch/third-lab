import * as React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {AutoComplete, Button, Col, Form, Input, Row, Tabs, Tag} from "antd";

import * as hljs from "highlight.js";
import * as MarkdownIt from "markdown-it";
import {chgPost, clearModifyMark} from "../../sagas/posts";
import {styles} from "../../client";
import {bindActionCreators} from "redux";
import {isNullOrUndefined} from "util";

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
	wikipost: any,
	wikitaglist: any[],
	modifySuccess: boolean,
}

interface DispatchProps {
	chgPost(postId: number, post: any);
	clearModifyMark();
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		wikipost: state.wikispecpost.wikipost,
		wikitaglist: state.wikitags.wikitaglist,
		modifySuccess: state.wikispecpost.modifySuccess
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		chgPost: chgPost,
		clearModifyMark: clearModifyMark,
	}, dispatch)
};

class WikiEdit extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);

		console.info('constructor ' + props.wikipost.title);

		let maxTagId = 0;
		const tags = props.wikipost.tags.map((tag) => {
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
			postParentId: props.wikipost.parantId,
			maxTagId: maxTagId,
			postTags: tags,
			tagSearchResult: [],
			selectedTag: '',
			inputTag: '',
		};
	}

	componentDidMount() {
		console.info('componentDidMount ' + this.props.wikipost.title);

		this.props.clearModifyMark();
	}

	componentWillReceiveProps(nextProps) {
		// 当将会接收到属性时处理
		if (nextProps.modifySuccess === true) {
			// 修改成功, 切换到文章页, 并刷新
			const post = this.props.wikipost;
			browserHistory.push('/wiki/wikipost/' + post.id);
		}

		const tags = this.props.wikipost.tags.map((tag) => {
			return {
				id: tag.id,
				tagName: tag.tagName,
			};
		});
		this.setState({
			postTags: tags,
		})
	}

	updateTitle = (event) => {
		this.setState({postTitle: event.target.value});
	};

	updateText = (event) => {
		this.setState({postText: event.target.value});
	};

	updateParentId = (event) => {
		this.setState({postParentId: event.target.value});
	};

	confirmModify = (event) => {
		event.preventDefault();

		const post = this.props.wikipost;
		let postTags = [];
		this.state.postTags.map((postTag) => {
			postTags.push(postTag.tagName);
		});

		const updatedPost = {
			id: post.id,
			user: post.user,
			title: this.state.postTitle,
			postText: this.state.postText,
			parantId: parseInt(this.state.postParentId, 10),
			tags: postTags,
		};
		this.props.chgPost(post.id, updatedPost);
	};

	cancelModify = (event) => {
		event.preventDefault();

		const post = this.props.wikipost;
		browserHistory.push('/wiki/wikipost/' + post.id);
	};

	onTagSelect = (value) => {
		this.setState({
			selectedTag: value,
		});
	};

	onTagSearch = (inputValue) => {
		const searchResult = [];
		const existTagMap = new Map<string, boolean>();
		this.state.postTags.map((postTag) => {
			existTagMap[postTag.tagName] = true;
		});
		this.props.wikitaglist.filter((value, index) => {
			if (isNullOrUndefined(existTagMap[value.tagName]) == false) {
				return false;
			}
			if (value.tagName.indexOf(inputValue) === -1) {
				return false;
			}

			searchResult.push(value.tagName);
			return true;
		});

		console.info(inputValue);
		this.setState({
			tagSearchResult: searchResult,
			inputTag: inputValue,
		});
	};

	onTagEnterPress = (event) => {
		if (event.key === 'Enter') {
			// 按了回车
			const existTagMap = new Map<string, boolean>();
			this.state.postTags.map((postTag) => {
				existTagMap[postTag.tagName] = true;
			});

			let addNewTag = false;
			let newTagName = '';
			const selectedTag = this.state.selectedTag;
			if (selectedTag !== '') {
				// 判断这个tag是否已经存在
				if (isNullOrUndefined(existTagMap[selectedTag]) == false) {
					// 已经存在了
					return;
				}

				newTagName = selectedTag;
				addNewTag = true;

			} else {
				const inputTag = this.state.inputTag;
				if (inputTag != '') {
					// 判断这个tag是否已经存在
					if (isNullOrUndefined(existTagMap[selectedTag]) == false) {
						// 已经存在了
						return;
					}

					newTagName = inputTag;
					addNewTag = true;
				}
			}

			if (addNewTag) {
				let newTagId = this.state.maxTagId + 1;
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

	tagClose = (tag) => {
		console.info(tag);
		const remainings = this.state.postTags.filter((record, index) => {
			if (record == tag) {
				return false;
			} else {
				return true;
			}
		});
		this.setState({
			postTags: remainings,
		})
	};

	render() {
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

		const tags = this.state.postTags.map((tag) => {
			return (
				<Tag key={tag.id} closable afterClose={() => this.tagClose(tag)}>{tag.tagName}</Tag>
			);
		});

		const allTags = this.state.tagSearchResult;

		return (
			<Row>
				<Col span={24}>
					<Form>
						<Row>
							<Col span={24} style={{padding: '12px 0px',}}>
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
									style={{width: 200, padding: '0px 12px 0px 0px',}}
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