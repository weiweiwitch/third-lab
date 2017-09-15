import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {Col, Layout, Radio, Row} from "antd";

const {Header, Footer, Sider, Content} = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface StateProps {
	children?: any;
}

interface DispatchProps {
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
	}, dispatch)
};

class App extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	onChange = (e) => {
		const path = e.target.value;

		browserHistory.push(path);
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
							<RadioGroup onChange={this.onChange} defaultValue="/wiki/wikiindex">
								<RadioButton value="/wiki/wikiindex">Wiki</RadioButton>
								<RadioButton value="/solution/solutionindex">解决方案</RadioButton>
								<RadioButton value="/project/projecttask">任务管理</RadioButton>
							</RadioGroup>
						</Col>
					</Row>
				</Header>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);