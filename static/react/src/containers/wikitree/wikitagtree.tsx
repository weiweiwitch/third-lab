import * as React from "react";
import {connect} from "react-redux";
import {Tree} from "antd";
import {querySpecTagPosts} from "../../sagas/posts";
import {bindActionCreators} from "redux";

const TreeNode = Tree.TreeNode;

interface StateProps {
	wikitagtree: any[];
	dirty: boolean;
}

interface DispatchProps {
	querySpecTagPosts(tagId: number);
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
		querySpecTagPosts: querySpecTagPosts,
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
		this.props.querySpecTagPosts(nodeId);
	};

	render() {
		const wikitagtree = this.props.wikitagtree;

		const loop = data => data.map((item) => {
			if (item.nodes) {
				const treeNodeTitle = (
					<div>
						<span>{item.tagName}</span>
					</div>
				);
				return (
					<TreeNode key={item.id} title={treeNodeTitle} disableCheckbox={true}>
						{loop(item.nodes)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.id} title={item.tagName}/>;
		});

		return (
			<div>
				<Tree onExpand={this.onExpand}
					  autoExpandParent={true}
					  onCheck={this.onCheck}
					  onSelect={this.onSelect}
				>
					{loop(wikitagtree)}
				</Tree>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiTagTree);