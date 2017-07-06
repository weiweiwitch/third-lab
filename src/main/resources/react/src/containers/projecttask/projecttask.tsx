import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Col, Row, Tabs} from "antd";
import {addProjectSection} from "../../sagas/projectsections";
import TaskTable from "./tasktable";

const TabPane = Tabs.TabPane;

interface StateProps {
	specProject: any;
}

interface DispatchProps {
	addProjectSection(section: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		specProject: state.projects.specProject,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addProjectSection: addProjectSection,
	}, dispatch)
};

class ProjectTask extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			newSectionName: '',
		};
	}

	render() {

		return (
			<Row>
				<Col span={24}>
					<Tabs>
						<TabPane tab="结构" key="1">
							<TaskTable/>
						</TabPane>
						<TabPane tab="推进次序" key="2">Content of Tab Pane 2</TabPane>
					</Tabs>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTask);


