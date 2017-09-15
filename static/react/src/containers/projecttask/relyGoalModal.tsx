import * as React from "react";
import {Modal, Select} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {isNullOrUndefined} from "util";

const Option = Select.Option;

interface StateProps {
	selfGoalId: number;
	relyGoalId: number;
	goals: any[];
	tasks: any[];
	modalVisible: boolean;
}

interface DispatchProps {
	ok(selectedGoalId: number);
	cancel();
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		goals: state.projects.goalsOfSpecProject,
		tasks: state.projects.tasksOfSpecProject,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch)
};

interface RelyGoalModalState {
	selectedGoalId: number;
}

class RelyGoalModal extends React.Component<AppProps, RelyGoalModalState> {

	constructor(props) {
		super(props);

		this.state = {
			selectedGoalId: props.relyGoalId,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.state = {
			selectedGoalId: nextProps.relyGoalId,
		};
	}

	handleTaskOk = () => {
		console.info('ok ' + this.state.selectedGoalId);
		this.props.ok(this.state.selectedGoalId)
	};

	handleTaskCancel = () => {
		this.props.cancel();
	};

	handleChange = (value) => {
		console.info(value);

		this.setState({
			selectedGoalId: parseInt(value, 10),
		})
	};

	calFilter = (goalRelyMap, filterGoalMap, relyGoalId) => {
		filterGoalMap[relyGoalId] = true;
		const relyTasks = goalRelyMap[relyGoalId];
		if (!isNullOrUndefined(relyTasks)) {
			relyTasks.forEach((goalId) => {
				this.calFilter(goalRelyMap, filterGoalMap, goalId);
			});
		}
	};

	render() {
		// 建立所有被任务依赖的目标的表
		const tasks = this.props.tasks;
		const goalRelyMap = new Map<number, number[]>(); // 目标被哪些目标依赖
		const goalRelyWhatMap = new Map<number, number>(); // 任务的目标依赖了哪个目标
		tasks.forEach((task) => {
			if (task.relyGoalId !== 0) {
				let taskGoalIds = goalRelyMap[task.relyGoalId];
				if (isNullOrUndefined(taskGoalIds)) {
					taskGoalIds = [];
					goalRelyMap[task.relyGoalId] = taskGoalIds;
				}
				taskGoalIds.push(task.goalId);

				goalRelyWhatMap[task.goalId] = task.relyGoalId;
			}
		});

		// 筛选出当前目标的依赖目标表
		let goalOptions = [];
		if (this.props.relyGoalId !== 0 || isNullOrUndefined(goalRelyWhatMap[this.props.selfGoalId])) {
			// 当前目标没有依赖其他目标
			const filterGoalMap = new Map<number, boolean>();
			this.calFilter(goalRelyMap, filterGoalMap, this.props.selfGoalId);

			// 建立选择表
			const goals = this.props.goals;
			goalOptions = goals.filter((goal) => {
				const notRelyOn = isNullOrUndefined(filterGoalMap[goal.id]);
				return notRelyOn;
			}).map((goal) => {
				return (
					<Option key={goal.id} value={'' + goal.id}>{goal.name}</Option>
				);
			});
		}
		goalOptions.push(<Option key={0} value={'' + 0}>-</Option>);

		const selectValue = '' + (this.state.selectedGoalId === 0 ? '' : this.state.selectedGoalId);
		return (
			<Modal
				title="设置依赖目标"
				visible={this.props.modalVisible}
				onOk={this.handleTaskOk}
				onCancel={this.handleTaskCancel}>
				<div>
					<Select value={selectValue} style={{width: 120}} onChange={this.handleChange}>
						{goalOptions}
					</Select>
				</div>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RelyGoalModal);