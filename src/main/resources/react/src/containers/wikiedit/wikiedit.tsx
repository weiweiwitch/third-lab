import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {AutoComplete, Button, Col, Form, Input, Row, Tabs, Tag} from "antd";
import * as hljs from "highlight.js";
import * as MarkdownIt from "markdown-it";
import * as ReactMarkdown from "react-markdown";
import {bindActionCreators} from "redux";
import {chgPost, showPost} from "../../sagas/posts";
import {styles} from "../../client";
import {WikiTagData, WikiTagsState} from "../../redux/modules/wikitags";
import {SpecPostData, WikiSpecPostState} from "../../redux/modules/wikispecpost";
import {IPostData, WikiPostsState} from "../../redux/modules/wikiposts";
import {ReactNode} from "react";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const {TextArea} = Input;

// const md = new MarkdownIt({
//     html: true,
//     highlight: (str: any, lang: any) => {
//         if (lang && hljs.getLanguage(lang)) {
//             try {
//                 return hljs.highlight(lang, str).value;
//             } catch (e) {
//                 // console.error(e);
//             }
//         }
//
//         return ''; // use external default escaping
//     },
// });

interface IStateProps {
    history: History;
    posts: IPostData[];
    wikipost: SpecPostData;
    wikitaglist: WikiTagData[];
}

interface IDispatchProps {
    chgPost(postId: number, post: any);

    showPost(postId: number);
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any) => {
    const wikiposts: WikiPostsState = state.wikiposts;
    const wikispecpost: WikiSpecPostState = state.wikispecpost;
    const wikitags: WikiTagsState = state.wikitags;

    return {
        posts: wikiposts.wikiposts,
        wikipost: wikispecpost.wikipost,
        wikitaglist: wikitags.wikitaglist,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        chgPost,
        showPost,
    }, dispatch);
};

interface IState {
    postTitle: string;
    postText: string;
    postTag: WikiTagData;

    parentPost: IPostData;
    showedParentPost: any[];
    parentPostSearchResult: any[];
    selectedParentPost: string;
    inputPost: string;
}

class WikiEdit extends React.Component<IAppProps, IState> {

    constructor(props: IAppProps) {
        super(props);

        // 所属标签
        let postTag = new WikiTagData();
        const postTagId = props.wikipost.tagId;
        props.wikitaglist.map((tag: any) => {
            if (tag.id === postTagId) {
                postTag = tag;
            }
        });

        // 上级文章
        let parentPost = null;
        let showedParentPost = [];
        if (props.wikipost.parentId > 0) {
            props.posts.map((post: IPostData) => {
                if (post.id === props.wikipost.parentId) {
                    parentPost = post;
                    showedParentPost = [post];
                }
            });
        }

        this.state = {
            postTitle: props.wikipost.title,
            postText: props.wikipost.postText,
            postTag,

            parentPost,
            showedParentPost,
            parentPostSearchResult: [],
            selectedParentPost: '',
            inputPost: '',
        };
    }

    updateTitle = (event: any) => {
        this.setState({postTitle: event.target.value});
    };

    updateText = (event: any) => {
        this.setState({postText: event.target.value});
    };

    confirmModify = (event: any) => {
        event.preventDefault();

        const postId = this.props.wikipost.id;
        const updatedPost = {
            title: this.state.postTitle,
            postText: this.state.postText,
            parentId: this.state.parentPost === null ? 0 : this.state.parentPost.id,
        };
        this.props.chgPost(postId, updatedPost);
    };

    cancelModify = (event: any) => {
        event.preventDefault();

        const postId = this.props.wikipost.id;
        this.props.showPost(postId);
    };

    onPostSelect = (value: any) => {
        this.setState({
            selectedParentPost: value,
        });
    };

    onPostSearch = (inputValue: any) => {
        const searchResult = [];
        const existPostMap = new Map<string, boolean>();
        this.state.showedParentPost.map((post: IPostData) => {
            existPostMap[post.title] = true;
        });
        this.props.posts.filter((post: IPostData) => {
            if (existPostMap[post.title] !== null && existPostMap[post.title] !== undefined) {
                // 过滤掉已经添加给目标的标签
                return false;
            }
            if (post.tagId !== this.props.wikipost.tagId) {
                // 过滤掉不属于一个标签的
                return false;
            }
            if (post.title.indexOf(inputValue) === -1) {
                // 过滤掉总标签表中和当前输入不符的。
                return false;
            }

            searchResult.push(post.title);
            return true;
        });

        this.setState({
            parentPostSearchResult: searchResult,
            inputPost: inputValue,
        });
    };

    onPostEnterPress = (event: any) => {
        if (event.key === 'Enter') {
            // 按了回车
            const existPostMap = new Map<string, number>();
            this.state.showedParentPost.map((post: IPostData) => {
                existPostMap[post.title] = post;
            });

            let newParentPost = null;
            let selectedNewParentPost = false;
            const selectedPostName = this.state.selectedParentPost;
            if (selectedPostName !== '') {
                // 判断这个post是否已经存在
                if (existPostMap[selectedPostName] !== null && existPostMap[selectedPostName] !== undefined) {
                    // 已经存在了
                    return;
                }

                this.props.posts.map((post: IPostData) => {
                    if (post.title === selectedPostName) {
                        newParentPost = post;
                        selectedNewParentPost = true;
                    }
                });
                if (selectedNewParentPost === false) {
                    return;
                }

            } else {
                return;
            }

            this.setState({
                parentPost: newParentPost,
                showedParentPost: [newParentPost],
                selectedParentPost: '', // 清空选择
                inputPost: '',
            });
        }
    };

    postClose = (post: IPostData) => {
        const remainings = this.state.showedParentPost.filter((record: any, index: any) => {
            return record !== post;
        });
        if (remainings.length > 0) {
            return;
        }

        this.setState({
            parentPost: null,
            showedParentPost: [],
        });
    };

    render() {
        const parentPosts = this.state.showedParentPost.map((post: IPostData) => {
            return (
                <Tag key={post.id} closable afterClose={() => this.postClose(post)}>{post.title}</Tag>
            );
        });

        const allPosts = this.state.parentPostSearchResult;

        return (
            <Row>
                <Col span={24}>
                    <Form>
                        {/*标题编辑*/}
                        <Row>
                            <Col span={24} style={{padding: '12px 0px'}}>
                                <Input placeholder="请输入标题"
                                       onChange={this.updateTitle} value={this.state.postTitle}
                                />
                            </Col>
                        </Row>

                        {/*标签和结构编辑*/}
                        <Row>
                            <Col span={12}>
                                <span>{this.state.postTag.tagName}</span>
                            </Col>
                            <Col span={12}>
                                <AutoComplete
                                    allowClear={true}
                                    dataSource={allPosts}
                                    style={{width: 300, padding: '0px 12px 0px 0px'}}
                                    onSelect={this.onPostSelect}
                                    onSearch={this.onPostSearch}
                                    placeholder="选择上级"
                                >
                                    <input onKeyPress={this.onPostEnterPress}/>
                                </AutoComplete>
                                {parentPosts}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Markdown" key="1">
                                        <div className="tab-edit-panel">
                                            <TextArea style={styles.codeStyle}
                                                      className="edit-text postedit-textarea-height"
                                                      placeholder="内容" onChange={this.updateText}
                                                      value={this.state.postText}/>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="预览" key="2">
                                        <ReactMarkdown className="inner_topic markdown-text postedit-textarea-height"
                                                       source={this.state.postText}/>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Button type="primary" onClick={this.confirmModify}>更新</Button>
                                <Button onClick={this.cancelModify}>取消</Button>
                            </Col>
                        </Row>

                    </Form>
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiEdit);