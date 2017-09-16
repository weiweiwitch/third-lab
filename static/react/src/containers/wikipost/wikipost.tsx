import * as React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {Button, Col, Row, Tag, Tree} from "antd";

import * as hljs from "highlight.js";
import * as MarkdownIt from "markdown-it";
import {deletePost} from "../../sagas/posts";
import {bindActionCreators} from "redux";

// import {} from "./wikiPost.scss";
require('./wikiPost.scss');

const TreeNode = Tree.TreeNode;

const md = new MarkdownIt({
	html: true,
	highlight: (str: any, lang: any): any => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (e) {
				// console.info('hightlight');
				// console.info(e);
			}
		}

		return ''; // use external default escaping
	},
});

interface IStateProps {
	params: any;
	wikipost: any;
	dirty: boolean;
}

interface IDispatchProps {
	deletePost(postId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		wikipost: state.wikispecpost.wikipost,
		dirty: state.wikiposts.dirty,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		deletePost,
	}, dispatch);
};

class HeaderNode {
	key: number;
	headLv: number;
	prefix: string;
	content: string;
}

class WikiPost extends React.Component<IAppProps, any> {

	constructor(props: IAppProps) {
		super(props);
	}

	componentDidMount(): any {

	}

	// 编辑文章
	edit = (event: any): any => {
		browserHistory.push('/wiki/wikiedit');
	};

	// 创建子文章
	createSubPost = (event: any): any => {
		const post = this.props.wikipost;
		browserHistory.push('/wiki/wikinew/' + post.id);
	};

	// 删除文章
	deletePost = (event: any): any => {
		// 删除特定post
		const post = this.props.wikipost;
		this.props.deletePost(post.id);

		// 跳到首页
		browserHistory.push('/wiki/wikiindex');
	};

	// 返回首页
	transToIndex = (event: any): any => {
		browserHistory.push('/wiki/wikiindex');
	};

	render(): any {
		const post = this.props.wikipost;

		const result = {__html: md.render(post.postText)};

		// 解析markdown结构
		const headerNodes: HeaderNode[] = [];
		try {
			const parseResult = md.parse(post.postText);
			let headingStarted = false;
			let currentHeaderNode;
			let headerKey = 1;
			parseResult.forEach((token: any) => {
				if (token.type === 'heading_open') {
					headingStarted = true;
					const nowHeadLv = token.markup.split('');
					const headerNode = {
						key: headerKey,
						headLv: nowHeadLv,
						prefix: token.markup,
						content: '',
					};

					headerKey++;
					currentHeaderNode = headerNode;
					headerNodes.push(headerNode);

				} else if (token.type === 'heading_close') {
					headingStarted = false;
				}

				if (headingStarted) {
					if (token.type === 'inline') {
						currentHeaderNode.content = token.content;
					}
				}
			});
		} catch (e) {
			//console.info(e);
		}

		const headers = headerNodes.map((headerNode: HeaderNode) => {
			return (
				<TreeNode title={headerNode.prefix + ' ' + headerNode.content} key={headerNode.key}>
				</TreeNode>
			);
		});

		const tags = post.tags.map((tag: any) => {
			return (
				<Tag key={tag.id}>{tag.tagName}</Tag>
			);
		});

		return (
			<Row>
				<Col span={20}>
					{/* 编辑栏 */}
					<Row>
						<Col span={22}>
							<Button type="primary" onClick={this.edit}>编辑</Button>
							<Button onClick={this.createSubPost}>添加子级文章</Button>
							<Button onClick={this.transToIndex}>搜索</Button>
						</Col>
						<Col span={2}>
							<Button type="danger" onClick={this.deletePost}>删除</Button>
						</Col>
					</Row>
					{/* 文章内容 */}
					<Row>
						<Col span={24}>
							<div className="inner_topic_container">
								<div className="topic_header">
									<span className="topic_full_title">{post.title}</span>
								</div>
								<div>
									<span>标签：</span>
									{tags}
								</div>
								<div className="inner_topic">
									<div className="markdown-text" dangerouslySetInnerHTML={result}></div>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
				<Col span={4}>
					<Tree>
						{headers}
					</Tree>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiPost);