import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {Button, Col, Row, Tag, Tree} from "antd";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {deletePost, prepareCreatePost} from "../../sagas/posts";
import {SpecPostData, WikiSpecPostState} from "../../redux/modules/wikispecpost";
import {WikiTagData, WikiTagsState} from "../../redux/modules/wikitags";
import md from '../md';

// import {} from "./wikiPost.scss";
require('./wikiPost.scss');

const TreeNode = Tree.TreeNode;

interface IStateProps {
	history: History;
	wikipost: SpecPostData;
	wikitaglist: WikiTagData[];
}

interface IDispatchProps {
	deletePost(postId: number): any;
	prepareCreatePost(parentId: number): any;
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
		deletePost,
		prepareCreatePost,
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

	// 编辑文章
	edit = (event: any): any => {
		this.props.history.push('/wiki/wikiedit');
	};

	// 创建子文章
	createSubPost = (event: any): any => {
		const postId = this.props.wikipost.id;
		this.props.prepareCreatePost(postId);
	};

	// 删除文章
	deletePost = (event: any): any => {
		// 删除特定post
		const post = this.props.wikipost;
		this.props.deletePost(post.id);

		// 跳到首页
		this.props.history.push('/wiki/wikiindex');
	};

	// 返回首页
	transToIndex = (event: any): any => {
		this.props.history.push('/wiki/wikiindex');
	};

	move2NewTag = (): any => {
		this.props.history.push('/wiki/wikipostmove2tag');
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

		let postTag = new WikiTagData();
		this.props.wikitaglist.map((tag: WikiTagData): any => {
			if (tag.id === post.tagId) {
				postTag = tag;
			}
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
							<Button onClick={this.move2NewTag}>移动标签</Button>
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
									<Tag key={postTag.id}>{postTag.tagName}</Tag>
								</div>
								<div className="inner_topic">
									<div className="markdown-text" dangerouslySetInnerHTML={result} />
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