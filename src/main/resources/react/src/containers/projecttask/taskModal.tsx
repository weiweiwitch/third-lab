import * as React from "react";
import {Input, Modal} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addProjectTask, chgProjectTask} from "../../sagas/projecttasks";
interface StateProps {
	task: any;
	parentGoal: any;
	projectId: number;
	taskModalVisible: boolean;
	atCreate: boolean;
}

interface DispatchProps {
	ok();
	cancel();
	addProjectTask(task: any);
	chgProjectTask(taskId: number, task: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addProjectTask: addProjectTask,
		chgProjectTask: chgProjectTask,
	}, dispatch)
};

interface TaskModalState {
	id: number;
	taskName: string;
}

class TaskModal extends React.Component<AppProps, TaskModalState> {

	constructor(props) {
		super(props);

		this.syncProps(props);
	}

	componentWillReceiveProps(nextProps) {
		this.syncProps(nextProps);
	}

	syncProps(props) {
		if (props.atCreate) {
			this.state = {
				id: 0,
				taskName: '',
			}

		} else {
			this.state = {
				id: props.task.id,
				taskName: props.task.name,
			};
		}
	}

	handleTaskOk = () => {
		if (this.state.taskName.trim() === '') {
			return;
		}

		const task = {
			id: this.state.id,
			name: this.state.taskName,
			projectId: this.props.projectId,
			goalId: this.props.parentGoal.id,
		};

		if (this.props.atCreate) {
			this.props.addProjectTask(task);
		} else {
			this.props.chgProjectTask(task.id, task);
		}

		this.props.ok()
	};

	handleTaskCancel = () => {
		this.props.cancel();
	};

	onTaskNameChange = (event) => {
		this.setState({
			taskName: event.target.value,
		});
	};

	render() {
		return (
			<Modal
				title={this.props.atCreate ? "添加任务" : "编辑任务"}
				visible={this.props.taskModalVisible}
				onOk={this.handleTaskOk}
				onCancel={this.handleTaskCancel}
			>
				<Input placeholder="请输入任务名" onChange={this.onTaskNameChange} value={this.state.taskName}/>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);