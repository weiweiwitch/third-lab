import * as React from 'react';
import {Tree} from 'antd';

import './wikiTopicTree.scss';

const TreeNode = Tree.TreeNode;

interface IStateProps {
    dataSource: any[];
    expandedRowKeys: any[];
}

interface IDispatchProps {
    onShowPost(id: number);
}

type IAppProps = IStateProps & IDispatchProps;

interface IStates {
}

class WikiTopicTree extends React.Component<IAppProps, IStates> {

    onSelect = (selectedKeys: any[], e: { selected: boolean, selectedNodes: any[], node: any, event: any }) => {
        if (selectedKeys.length > 0) {
            const postId = parseInt(selectedKeys[0], 10);
            this.props.onShowPost(postId);
        }
    };

    parseTreeNodes = (data: any) => data.map((item: any) => {
        if (item.children !== null && item.children !== undefined && item.children.length > 0) {
            return (
                <TreeNode title={item.title} key={item.id} className="wikitopicli">
                    {this.parseTreeNodes(item.children)}
                </TreeNode>
            );
        } else {
            return (
                <TreeNode title={item.title} key={item.id} className="wikitopicli"/>
            );
        }
    });

    render() {
        return (
            <Tree defaultExpandAll={true}
                  expandedKeys={this.props.expandedRowKeys}
                  showLine
                  onSelect={this.onSelect}
            >
                {this.parseTreeNodes(this.props.dataSource)}
            </Tree>
        );
    }
}

export default WikiTopicTree;