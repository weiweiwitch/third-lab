import * as React from "react";
import {ReactNode} from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {bindActionCreators} from "redux";
import {Col, Input, Row, Table} from "antd";

import {querySpecPost, showPost} from "../../sagas/posts";
import {IPostData, WikiPostsState} from "../../redux/modules/wikiposts";
import {WikiTagData, WikiTagsState} from "../../redux/modules/wikitags";
import wikitags from "../../redux/modules/wikitags";

interface IStateProps {
    history: History;
    wikiposts: IPostData[];
    wikitagMap: Map<number, WikiTagData>;
}

interface IDispatchProps {
    querySpecPost(postId: number);

    showPost(postId: number);
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any) => {
    const wikiposts: WikiPostsState = state.wikiposts;
    const wikitags: WikiTagsState = state.wikitags;
    return {
        wikiposts: wikiposts.wikiposts,
        wikitagMap: wikitags.wikitagMap,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        querySpecPost,
        showPost,
    }, dispatch);
};

interface IState {
    searchSource: IPostData[];
}

class WikiIndex extends React.Component<IAppProps, IState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            searchSource: [],
        };
    }

    handleUpdateInput = (event: any) => {
        const keyword = event.target.value;
        if (keyword.trim() === '') {
            this.setState({
                searchSource: [],
            });
        } else {
            const wikiposts = this.props.wikiposts;
            const filterPosts = [];
            this.searchEachNode(keyword, wikiposts, filterPosts);

            this.setState({
                searchSource: filterPosts,
            });
        }
    };

    searchEachNode = (keyword: string, wikiposts: IPostData[], filterPosts: IPostData[]) => {
        for (const post of wikiposts) {
            if (post.title.includes(keyword)) {
                filterPosts.push(post);
            }
        }
    };

    onRow = (record: any, index: any) => {
        return {
            onClick: () => {
                // 查询特定文章
                this.props.querySpecPost(record.id);

                // 切换页面
                this.props.showPost(record.id);
            },
        };
    };

    showPost = (chosenRequest: any, index: any) => {
        if (index !== -1) {
            const postId = this.state.searchSource[index].id;
            this.props.showPost(postId);
        }
    };

    render() {
        const columns = [{
            key: 'title',
            title: '标题',
            dataIndex: 'title',
        }, {
            key: 'tag',
            title: '标签',
            render: (text: any, record: any): ReactNode => {
                const tagId = record.tagId;
                const specTag = this.props.wikitagMap[tagId];
                if (specTag === undefined) {
                    return (<div>【尚未归类】</div>);
                } else {
                    return (<div>{specTag.tagName}</div>);
                }

            },
        }];

        return (
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={24} style={{padding: '12px 0px'}}>
                            <Input placeholder="搜索" onChange={this.handleUpdateInput}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table size="small" pagination={false} onRow={this.onRow}
                                   columns={columns}
                                   dataSource={this.state.searchSource} rowKey="id"/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiIndex);