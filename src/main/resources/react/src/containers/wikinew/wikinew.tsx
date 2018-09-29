import * as React from "react";
import { connect } from "react-redux";
import { History } from 'history';
import { Button, Col, Form, Input, Row, Tabs } from "antd";
import { bindActionCreators } from "redux";
import * as hljs from "highlight.js";
import * as MarkdownIt from 'markdown-it';
import { match, withRouter } from "react-router";
import { styles } from "../../client";
import { addPost } from "../../sagas/posts";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const {TextArea} = Input;

const md = new MarkdownIt({
    html: true,
    highlight: (str: any, lang: any) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {
                //console.info(e);
            }
        }

        return ''; // use external default escaping
    },
});

interface IStateProps {
    history: History;
    match: match<any>;
}

interface IDispatchProps {
    addPost(data: any);
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addPost,
    }, dispatch);
};

interface IState {
    parentId: number;
    postTitle: string;
    postText: string;
}

class WikiNew extends React.Component<IAppProps, IState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            parentId: parseInt(this.props.match.params.parentId, 10),
            postTitle: '',
            postText: '',
        };
    }

    updateTitle = (event: any) => {
        this.setState({postTitle: event.target.value});
    };

    updateText = (event: any) => {
        let text = event.target.value;
        if (text === null) {
            text = '';
        }
        this.setState({postText: text});
    };

    createPost = (event: any) => {
        event.preventDefault();
        const post = {
            id: 0,
            user: '',
            title: this.state.postTitle,
            postText: this.state.postText,
            parentId: this.state.parentId,
        };
        this.props.addPost(post);
    };

    cancelCreate = (event: any) => {
        event.preventDefault();

        this.props.history.push('/wiki/wikiindex');
    };

    render() {
        const postText = {__html: md.render(this.state.postText)};

        return (
            <Row>
                <Col span={24}>
                    <Form>

                        <Row>
                            <Col span={24}>
                                <Input placeholder="请输入标题"
                                       onChange={this.updateTitle}
                                       value={this.state.postTitle}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Markdown" key="1">
                                        <div className="tab-edit-panel">
											<TextArea style={styles.codeStyle}
                                                      className="edit-text postnew-textarea-height"
                                                      placeholder="内容" onChange={this.updateText}
                                                      value={this.state.postText}/>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="预览" key="2">
                                        <div className="tab-edit-panel">
                                            <div className="inner_topic markdown-text postnew-textarea-height"
                                                 dangerouslySetInnerHTML={postText}/>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Button type="primary" onClick={this.createPost}>新建</Button>
                                <Button onClick={(event: any) => {
                                    this.cancelCreate(event);
                                }}>取消</Button>
                            </Col>
                        </Row>

                    </Form>
                </Col>
            </Row>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiNew);