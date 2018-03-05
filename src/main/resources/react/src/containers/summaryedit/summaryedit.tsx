import * as React from "react";
import { connect } from "react-redux";
import { History } from 'history';
import { Button, Col, Form, Input, Row, Tabs } from "antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { styles } from "../../client";
import { modifySummary } from "../../sagas/summary";
import { SummaryState } from "../../redux/modules/summary";
import md from '../md';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const {TextArea} = Input;

interface IStateProps {
    history: History;
    summary: string;
}

interface IDispatchProps {
    modifySummary(data: string): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
    const summary: SummaryState = state.summary;

    return {
        summary: summary.summary,
    };
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        modifySummary,
    }, dispatch);
};

interface IState {
    summary: string;
}

const showStyle = {
    margin: '20px 100px',
};

class SummaryEdit extends React.Component<IAppProps, IState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            summary: props.summary,
        };
    }

    updateSummary = (event: any): any => {
        this.setState({summary: event.target.value});
    };

    confirmModify = (event: any): any => {
        event.preventDefault();

        this.props.modifySummary(this.state.summary);
    };

    cancelModify = (event: any): any => {
        event.preventDefault();

        this.props.history.push('/');
    };

    render(): any {
        const postText = {__html: md.render(this.state.summary)};

        const formItemLayout2 = {
            labelCol: {span: 0},
            wrapperCol: {span: 24},
        };

        return (
            <Row style={showStyle}>
                <Col span={24}>

                    <Row>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Markdown" key="1">
                                    <Form>
                                        <FormItem {...formItemLayout2}>
											<TextArea style={styles.codeStyle}
                                                      className="edit-text textarea-height"
                                                      placeholder="内容" onChange={this.updateSummary}
                                                      value={this.state.summary}
                                            />
                                        </FormItem>
                                    </Form>
                                </TabPane>
                                <TabPane tab="预览" key="2">
                                    <div className="inner_topic markdown-text textarea-height"
                                         dangerouslySetInnerHTML={postText}/>
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

                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryEdit);