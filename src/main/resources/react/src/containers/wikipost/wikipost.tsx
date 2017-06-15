import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Col, Row} from "antd";
import * as hljs from "highlight.js";
import * as MarkdownIt from "markdown-it";
import {deletePost} from "../../sagas/posts";
import {bindActionCreators} from "redux";

require('./wikiPost.scss');

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
	params: any,
	wikipost: any,
	dirty: boolean,
}

interface DispatchProps {
	deletePost(postId: number);
	pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {
		wikipost: state.wikispecpost.wikipost,
		dirty: state.wikiposts.dirty
	};
}

class WikiPost extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	// 编辑文章
	edit = (event) => {
		this.props.pushState('/wiki/wikiedit');
	};

	// 创建子文章
	createSubPost = (event) => {
		const post = this.props.wikipost;
		this.props.pushState('/wiki/wikinew/' + post.id);
	};

	// 删除文章
	deletePost = (event) => {
		// 删除特定post
		const post = this.props.wikipost;
		this.props.deletePost(post.id);

		// 跳到首页
		this.props.pushState('/wiki/wikiindex');
	};

	// 返回首页
	transToIndex = (event) => {
		this.props.pushState('/wiki/wikiindex');
	};

	render() {
		const post = this.props.wikipost;

		const result = {__html: md.render(post.postText)};

		return (
			<Row>
				<Col span={24}>
					{/* 编辑栏 */}
					<Row>
						<Col span={22}>
							<Button type="primary" onClick={this.edit}>编辑</Button>
							<Button onClick={this.createSubPost}>添加子文章</Button>
							<Button onClick={this.transToIndex}>首页</Button>
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
								<div className="inner_topic">
									<div className="markdown-text" dangerouslySetInnerHTML={result}></div>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, (dispatch) => {
	return bindActionCreators({
		deletePost: deletePost,
		pushState: push
	}, dispatch)
})(WikiPost);