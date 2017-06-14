import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Col, Row, Tree} from "antd";
import {queryPosts, querySpecPost} from "../../sagas/posts";
import {bindActionCreators} from "redux";

const TreeNode = Tree.TreeNode;

interface StateProps {
	wikiposts: any[];
	dirty: boolean;
}

interface DispatchProps {
	pushState(nextLocation: any);
	queryPosts();
	querySpecPost(postId: number)
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {
		wikiposts: state.wikiposts.wikiposts,
		dirty: state.wikiposts.dirty
	};
}

class WikiTree extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			nodeExpands: new Map()
		};
	}

	componentWillReceiveProps(nextProps) {
		// 当将会接收到属性时处理
		if (nextProps.dirty === true) {
			// console.info('wikitree call queryPosts()');
			this.props.queryPosts();
		}
	}

	createPost = () => {
		this.props.pushState('/wiki/wikinew/0');
	};

	onExpand = (expandedKeys) => {
		// console.log('onExpand', arguments);
	};

	onCheck = (checkedKeys) => {
		// console.info(checkedKeys);
	};

	onSelect = (selectedKeys: string[], info) => {
		if (selectedKeys.length === 0) {
			return;
		}

		const nodeId = parseInt(selectedKeys[0], 10);

		// 查询特定文章
		this.props.querySpecPost(nodeId);

		// 切换页面
		this.props.pushState('/wiki/wikipost/' + nodeId);
	};

	render() {
		const wikiposts = this.props.wikiposts;

		const loop = data => data.map((item) => {
			if (item.nodes) {
				return (
					<TreeNode key={item.id} title={item.title} disableCheckbox={true}>
						{loop(item.nodes)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.id} title={item.title}/>;
		});

		return (
			<div className="main-auto-height">
				<Row>
					<Col span={24}>
						<Button type="primary" onClick={(event) => {
							this.createPost();
						}}>创建</Button>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Tree onExpand={this.onExpand}
							  autoExpandParent={true}
							  onCheck={this.onCheck}
							  onSelect={this.onSelect}
						>
							{loop(wikiposts)}
						</Tree>
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect(mapStateToProps, (dispatch) => {
	return bindActionCreators({
		pushState: push,
		queryPosts: queryPosts,
		querySpecPost: querySpecPost,
	}, dispatch)
})(WikiTree);
