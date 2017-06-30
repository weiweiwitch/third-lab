import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";
import {Col, Input, Row} from "antd";
import {addProjectSection} from "../../sagas/projectsections";
import {TaskTable} from "./tasktable";

interface StateProps {
	specProject: any;
}

interface DispatchProps {
	pushState(nextLocation: any);
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
		pushState: push,
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

	onNewSectionChange = (event) => {
		this.setState({
			newSectionName: event.target.value,
		});
	};

	onNewSectionAdd = (event) => {
		if (this.state.newSectionName.trim() === '') {
			return;
		}

		this.props.addProjectSection({
			name: this.state.newSectionName,
			projectId: this.props.specProject.id,
		});

		this.setState({
			newSectionName: '',
		})
	};

	render() {

		return (
			<Row>
				<Col span={24}>
					<Row>
						<Col span={24}>
							<Input placeholder="添加目标组" onChange={this.onNewSectionChange}
								   onPressEnter={this.onNewSectionAdd} value={this.state.newSectionName}/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<TaskTable/>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTask);

