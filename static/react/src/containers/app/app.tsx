import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {match, Route, Switch} from "react-router";
import {History} from 'history';
import {Button, Col, Layout, Row} from "antd";

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

		// 切换到特定界面
		this.props.history.push(path);
	};

	onClick = (path: string): any => {
		// 切换到特定界面
		this.props.history.push(path);
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
							<ButtonGroup>
								<Button onClick={(): any => this.onClick("/wiki/wikiindex")}>Wiki</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Header>
				<div>
					<Switch>
						<Route exact path={`/`} component={Summary}/>
						<Route path={`/summaryedit`} component={SummaryEdit}/>
						<Route path={`/wiki`} component={Wiki}/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);