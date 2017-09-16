import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {Col, Layout, Radio, Row} from "antd";

const {Header, Footer, Sider, Content} = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface IStateProps {
	children?: any;
}

interface IDispatchProps {
}

type IAppProps = IStateProps & IDispatchProps;

function mapStateToProps(state: any): any {
	return {};
}

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
	}, dispatch);
};

class App extends React.Component<IAppProps, any> {

	constructor(props: IAppProps) {
		super(props);
	}

	onChange = (e: any): any => {
		const path = e.target.value;

		browserHistory.push(path);
	};

	render(): any {
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