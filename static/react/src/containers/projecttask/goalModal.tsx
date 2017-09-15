import * as React from "react";
import {Input, Modal} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addProjectGoal, chgProjectGoal} from "../../sagas/projectgoals";

interface StateProps {
	goal: any;
	parentSection: any;
	projectId: number;
	goalModalVisible: boolean;
	atCreate: boolean;
}

interface DispatchProps {
	ok();
	cancel();
	addProjectGoal(goal: any);
	chgProjectGoal(goalId: number, goal: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addProjectGoal: addProjectGoal,
		chgProjectGoal: chgProjectGoal,
	}, dispatch)
};

interface GoalModalState {
	id: number;
	goalName: string;
}

class GoalModal extends React.Component<AppProps, GoalModalState> {

	constructor(props) {
		super(props);

		this.syncState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.syncState(nextProps);
	}

	syncState(props) {
		if (props.atCreate) {
			this.state = {
				id: 0,
				goalName: '',
			};

		} else {
			console.info('编辑框目标名：' + props.goal.name);
			this.state = {
				id: props.goal.id,
				goalName: props.goal.name,
			};
		}
	}

	handleGoalOk = () => {
		if (this.state.goalName.trim() === '') {
			return;
		}

		const goal = {
			id: this.state.id,
			name: this.state.goalName,
			projectId: this.props.projectId,
			sectionId: this.props.parentSection.id,
		};
		if (this.props.atCreate) {
			this.props.addProjectGoal(goal);
		} else {
			this.props.chgProjectGoal(goal.id, goal);
		}

		console.info('handleGoalOk ' + this.props.parentSection.id);
		this.props.ok()
	};

	handleGoalCancel = () => {
		this.props.cancel();
	};

	onGoalNameChange = (event) => {
		this.setState({
			goalName: event.target.value,
		});
	};

	render() {
		return (
			<Modal
				title={this.props.atCreate ? "添加目标" : "编辑目标"}
				visible={this.props.goalModalVisible}
				onOk={this.handleGoalOk}
				onCancel={this.handleGoalCancel}
			>
				<Input placeholder="请输入目标名" onChange={this.onGoalNameChange} value={this.state.goalName}/>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalModal);