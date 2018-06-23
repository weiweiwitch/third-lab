import * as React from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {querySpecTagPosts} from "../../sagas/posts";
import {bindActionCreators} from "redux";
import {WikiTagsState} from "../../redux/modules/wikitags";

const SubMenu = Menu.SubMenu;

interface IStateProps {
    wikitagtree: any[];
}

interface IDispatchProps {
    querySpecTagPosts(tagId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
    const wikitags: WikiTagsState = state.wikitags;

    return {
        wikitagtree: wikitags.wikitagtree,
    };
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        querySpecTagPosts,
    }, dispatch);
};

interface IStates {
}

class WikiTagTree extends React.Component<IAppProps, IStates> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {};
    }

    onClick = (e: any): any => {
        const nodeId = parseInt(e.key, 10);
        this.props.querySpecTagPosts(nodeId);
    };

    render(): any {
        const wikitagtree = this.props.wikitagtree;

        const parseMenuItems = (data: any): any => data.map((item: any) => {
            if (item.nodes !== null && item.nodes !== undefined && item.nodes.length > 0) {
                return (
                    <SubMenu key={item.id} title={item.tagName} onTitleClick={this.onClick}>
                        {parseMenuItems(item.nodes)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.id}>{item.tagName}</Menu.Item>
                );
            }
        });

        return (
            <div>
                <Menu onClick={this.onClick} mode="horizontal">
                    {parseMenuItems(wikitagtree)}
                </Menu>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiTagTree);
