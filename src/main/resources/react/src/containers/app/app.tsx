import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { match, Route, Switch } from "react-router";
import { History } from 'history';
import { Button, Col, Layout, Row } from "antd";

import Summary from "../summary/summary";
import SummaryEdit from "../summaryedit/summaryedit";
import Wiki from "../wiki/wiki";

const {Header, Footer, Sider, Content} = Layout;
const ButtonGroup = Button.Group;

interface IStateProps {
    match: match<any>;
    history: History;
}

interface IDispatchProps {
}

type IAppProps = IStateProps & IDispatchProps;

function mapStateToProps(state: any) {
    return {};
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    onChange = (e: any) => {
        const path = e.target.value;

        // 切换到特定界面
        this.props.history.push(path);
    };

    showSummary = () => {
        console.info(`${this.props.match.path}`);
        this.props.history.push('/');
    };

    showWiki = () => {
        // 切换到特定界面
        console.info(`${this.props.match.path}`);
        this.props.history.push('/wiki/wikiindex');
    };

    render() {
        return (
            <div style={{padding: '0px'}}>
                <Header className="header">
                    <Row>
                        <Col span={20}>
                            <div id="logo"><span>third lab</span></div>
                        </Col>
                        <Col span={4}>
                            <ButtonGroup>
                                <Button onClick={() => this.showSummary()}>Summary</Button>
                                <Button onClick={() => this.showWiki()}>Wiki</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Header>
                <div>
                    <Switch>
                        <Route path={`${this.props.match.path}summaryedit`} component={SummaryEdit}/>
                        <Route path={`${this.props.match.path}wiki`} component={Wiki}/>
                        <Route component={Summary}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);