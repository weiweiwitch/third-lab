import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Col, Input, Row} from "antd";
import {addProjectSection} from "../../sagas/projectsections";
import TaskTable from "./tasktable";

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
							<AddSectionInput onChange={this.onNewSectionChange}
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

interface AddSectionInputProps {
	onChange(event);
	onPressEnter(event);
	value: string;
}

const AddSectionInput: React.SFC<AddSectionInputProps> = ({onChange, onPressEnter, value}): React.ReactElement<any> => {
	return (<Input placeholder="添加目标组" onChange={onChange}
				   onPressEnter={onPressEnter} value={value}/>);
};

