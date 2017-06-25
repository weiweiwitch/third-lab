import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Button, Col, Row, Tree} from "antd";
import {queryPosts} from "../../sagas/posts";
import {bindActionCreators} from "redux";

const TreeNode = Tree.TreeNode;

interface StateProps {
	wikitagtree: any[];
	dirty: boolean;
}

interface DispatchProps {
	pushState(nextLocation: any);
	queryPosts(tagId: number);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		wikitagtree: state.wikitags.wikitagtree,
		dirty: state.wikiposts.dirty
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
		queryPosts: queryPosts,
	}, dispatch)
};

interface AppStates {
	nodeExpands: Map<any, any>;
}

class WikiTagTree extends React.Component<AppProps, AppStates> {

	constructor(props) {
		super(props);

		this.state = {
			nodeExpands: new Map()
		};
	}

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

		// 查询特定tag下的所有文章
		const nodeId = parseInt(selectedKeys[0], 10);
		this.props.queryPosts(nodeId);
	};

	render() {
		const wikitagtree = this.props.wikitagtree;
		wikitagtree.push({
			id: 0,
			tagName: '未归类',
			parentTagId: 0,
		});

		const loop = data => data.map((item) => {
			if (item.nodes) {
				return (
					<TreeNode key={item.id} title={item.tagName} disableCheckbox={true}>
						{loop(item.nodes)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.id} title={item.tagName}/>;
		});

		return (
			<div>
				<div>
					<Tree onExpand={this.onExpand}
						  autoExpandParent={true}
						  onCheck={this.onCheck}
						  onSelect={this.onSelect}
					>
						{loop(wikitagtree)}
					</Tree>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiTagTree);
