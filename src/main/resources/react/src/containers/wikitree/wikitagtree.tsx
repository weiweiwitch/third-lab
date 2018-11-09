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
    querySpecTagPosts(tagId: number);
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any) => {
    const wikitags: WikiTagsState = state.wikitags;

    return {
        wikitagtree: wikitags.wikitagtree,
    };
};

const mapDispatchToProps = (dispatch: any) => {
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

    onClick = (e: any) => {
        const tagId = parseInt(e.key, 10);
        this.props.querySpecTagPosts(tagId);
    };

    render() {
        const wikiTagTree = this.props.wikitagtree;

        const parseMenuItems = (data: any, showLv: number) => data.map((item: any) => {
            let title = item.tagName;
            if (showLv > 1 && item.num > 0) {
                title = `${item.tagName}【${item.num}】`;
            }
            if (item.nodes !== null && item.nodes !== undefined && item.nodes.length > 0) {
                return (
                    <SubMenu key={item.id} title={title} onTitleClick={this.onClick}>
                        {parseMenuItems(item.nodes, showLv + 1)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.id}>{title}</Menu.Item>
                );
            }
        });

        const showLv = 1;
        return (
            <div>
                <Menu onClick={this.onClick} mode="horizontal">
                    {parseMenuItems(wikiTagTree, showLv)}
                </Menu>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiTagTree);
