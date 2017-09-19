import * as React from "react";
import {connect} from "react-redux";
import {Tree} from "antd";
import {querySpecTagPosts} from "../../sagas/posts";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";

const TreeNode = Tree.TreeNode;

interface IStateProps {
	wikitagtree: any[];
	dirty: boolean;
}

interface IDispatchProps {
	querySpecTagPosts(tagId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		wikitagtree: state.wikitags.wikitagtree,
		dirty: state.wikiposts.dirty,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		querySpecTagPosts,
	}, dispatch);
};

interface IAppStates {
	nodeExpands: Map<any, any>;
}

class WikiTagTree extends React.Component<IAppProps, IAppStates> {

	constructor(props: IAppProps) {
		super(props);

		this.state = {
			nodeExpands: new Map(),
		};
	}

	onExpand = (expandedKeys: any): any => {
		// console.log('onExpand', arguments);
	};

	onCheck = (checkedKeys: any): any => {
		// console.info(checkedKeys);
	};

	onSelect = (selectedKeys: string[], info: any): any => {
		if (selectedKeys.length === 0) {
			return;
		}

		// 查询特定tag下的所有文章
		const nodeId = parseInt(selectedKeys[0], 10);
		this.props.querySpecTagPosts(nodeId);
	};

	render(): any {
		const wikitagtree = this.props.wikitagtree;

		const loop = (data: any): any => data.map((item: any) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WikiTagTree));
