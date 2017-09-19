import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {match, Switch, Route} from "react-router";
import {History} from 'history';
import {Col, Layout, Radio, Row} from "antd";

import ShowIndex from "../showindex/showindex";
import Wiki from "../wiki/wiki";

const {Header, Footer, Sider, Content} = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface IStateProps {
	match: match<any>;
	history: History;
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

		this.props.history.push(path);
	};

	render(): any {
		console.info('match ', this.props.match.path, this.props.match.url);

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
					<Switch>
						<Route exact path={`/`} component={ShowIndex}/>
						<Route path={`/wiki`} component={Wiki}/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);