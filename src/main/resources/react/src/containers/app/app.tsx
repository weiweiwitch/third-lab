import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Row, Col, Radio} from "antd";
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface StateProps {
	children?: any
}

interface DispatchProps {
	pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
	}, dispatch)
};

class App extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	onChange = (e) => {
		const path = e.target.value;

		this.props.pushState(path);
	};

	render() {
		return (
			<div style={{padding: '0px'}}>
				<Header id="header">
					<Row>
						<Col span={20}>
							<div id="logo"><span>third lab</span></div>
						</Col>
						<Col span={4}>
							<RadioGroup onChange={this.onChange} defaultValue="/wiki/wikiindex">
								<RadioButton value="/wiki/wikiindex">Wiki</RadioButton>
								<RadioButton value="/solution/solutionindex">解决方案</RadioButton>
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