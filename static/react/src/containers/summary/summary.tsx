import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {History} from 'history';
import {Button, Col, Row} from "antd";
import md from '../md';
import {SummaryState} from "../../redux/modules/summary";
import {loginSuccess} from "../../sagas/auth";

interface IStateProps {
	history: History;
	summary: string;
}

interface IDispatchProps {
	loginSuccess(): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	const summary: SummaryState =  state.summary;

	return {
		summary: summary.summary,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
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

	componentDidMount(): any {
		this.props.loginSuccess();
	}

	onEdit = (): any => {
		this.props.history.push('/summaryedit');
	};

	render(): any {
		const summary = this.props.summary;
		const result = {__html: md.render(summary)};

		return (
			<div style={showStyle}>
				<Row>
					<Col span={24}>
						<Row>
							<Col span={23}>
								<div className="markdown-text" dangerouslySetInnerHTML={result} />
							</Col>
							<Col span={1}>
								<Button shape="circle" icon="edit" onClick={this.onEdit}></Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
