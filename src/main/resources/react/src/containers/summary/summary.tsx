import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {History} from 'history';
import {Button, Col, Row} from "antd";
import md from '../md';
import {SummaryState} from "../../redux/modules/summary";
import {loginSuccess} from "../../sagas/auth";
import {match} from "react-router";

interface IStateProps {
    match: match<any>;
    history: History;

    summary: string;
}

interface IDispatchProps {
    loginSuccess();
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any) => {
    const summary: SummaryState = state.summary;

    return {
        summary: summary.summary,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        loginSuccess,
    }, dispatch);
};

const showStyle = {
    margin: '20px 100px',
};

class Summary extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    componentDidMount() {
        this.props.loginSuccess();
    }

    onEdit = () => {
        this.props.history.push('/summaryedit');
    };

    render() {
        const summary = this.props.summary;
        const result = {__html: md.render(summary)};

        return (
            <div style={showStyle}>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={23}>
                                <div className="markdown-text" dangerouslySetInnerHTML={result}/>
                            </Col>
                            <Col span={1}>
                                <Button shape="circle" icon="edit" onClick={this.onEdit} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
