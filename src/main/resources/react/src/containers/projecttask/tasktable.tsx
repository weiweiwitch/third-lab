import * as React from "react";
import {Button, Icon, Input, Modal, Popover, Table} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";
import {addProjectGoal} from "../../sagas/projectgoals";
import {addProjectTask} from "../../sagas/projecttasks";
import {isNullOrUndefined} from "util";

export const SECTION_NODE = 1;
export const GOAL_NODE = 2;
export const TASK_NODE = 3;

export interface ITask {
	id: number;
	name: string;
	type: number;
}

interface ISectionNode extends ITask {
	key: string;
	children: IGoalNode[];
}

interface IGoalNode extends ITask {
	key: string;
	children: ITaskNode[];
}

interface ITaskNode extends ITask {
	key: string;
}

interface StateProps {
	specProject: any;
	sectionsOfSpecProject: any[];
	goalsOfSpecProject: any[];
	tasksOfSpecProject: any[];
}

interface DispatchProps {
	pushState(nextLocation: any);
	addProjectGoal(goal: any);
	addProjectTask(task: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		specProject: state.projects.specProject,
		sectionsOfSpecProject: state.projects.sectionsOfSpecProject,
		goalsOfSpecProject: state.projects.goalsOfSpecProject,
		tasksOfSpecProject: state.projects.tasksOfSpecProject,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
		addProjectGoal: addProjectGoal,
		addProjectTask: addProjectTask,
	}, dispatch)
};

interface ITaskTableState {
	sectionId: number,
	goalId: number,
	createGoalVisible: boolean,
	createTaskVisible: boolean,
	editTaskVisible: boolean,
}

export class TaskTable extends React.Component<AppProps, ITaskTableState> {

	constructor(props) {
		super(props);

		this.state = {
			sectionId: 0,
			goalId: 0,
			createGoalVisible: false,
			createTaskVisible: false,
			editTaskVisible: false,
		}
	}

	onRowClick = (record, index) => {

	};

	onClick4CreateGoal = (record) => {
		console.info('设置sectionId ' + record.id);
		this.setState({
			createGoalVisible: true,
			sectionId: record.id,
		});
	};

	onClick4CreateTask = (record) => {
		console.info('设置goalId ' + record.id);
		this.setState({
			createTaskVisible: true,
			goalId: record.id,
		});
	};

	columns: TableColumnConfig<ITask>[] = [{
		key: 'key',
		title: '名称',
		dataIndex: 'name',
		render: (text, record: ITask) => {
			return (
				<span>{record.name}</span>
			);
		},
	}, {
		key: 'op',
		title: '操作',
		render: (text, record: ITask) => {
			let pop;
			if (record.type === SECTION_NODE) {
				pop = (
					<span><Popover content={
						<div><Button onClick={() => this.onClick4CreateGoal(record)}>添加目标</Button></div>
					} trigger="click"><Icon type="ellipsis"/></Popover></span>
				);
			} else if (record.type === GOAL_NODE) {
				pop = (<span><Popover content={
						<div><Button onClick={() => this.onClick4CreateTask(record)}>添加任务</Button></div>
					} trigger="click"><Icon type="ellipsis"/></Popover></span>
				);
			} else {
				pop = (<span><Popover content={
						<div><Button>编辑任务</Button></div>
					} trigger="click"><Icon type="ellipsis"/></Popover></span>
				);
			}

			return (pop);
		},
	}];

	handleCreateGoalOk = (goal) => {
		console.info('add goal ' + goal);

		this.props.addProjectGoal(goal);

		this.setState({
			createGoalVisible: false,
		});
	};

	handleCreateGoalCancel = () => {
		this.setState({
			createGoalVisible: false,
		});
	};

	handleCreateTaskOk = (task) => {
		console.info('add task ' + task);

		this.props.addProjectTask(task);

		this.setState({
			createTaskVisible: false,
		});
	};

	handleCreateTaskCancel = () => {
		this.setState({
			createTaskVisible: false,
		});
	};

	selectNodes = (): ISectionNode[] => {
		const sections = this.props.sectionsOfSpecProject;
		const goals = this.props.goalsOfSpecProject;
		const tasks = this.props.tasksOfSpecProject;

		const sectionNodes: ISectionNode[] = [];
		const sectionNodeMap: Map<number, ISectionNode> = new Map<number, ISectionNode>();
		sections.forEach((section) => {
			const sectionNode = {
				id: section.id,
				type: SECTION_NODE,
				key: 'section.' + section.id,
				name: section.name,
				children: [],
			};

			sectionNodes.push(sectionNode);
			sectionNodeMap[section.id] = sectionNode;
		});

		const goalNodeMap: Map<number, IGoalNode> = new Map<number, IGoalNode>();
		goals.forEach((goal) => {
			const sectionNode = sectionNodeMap[goal.sectionId];
			if (isNullOrUndefined(sectionNode)) {
				return;
			}

			const goalNode = {
				id: goal.id,
				type: GOAL_NODE,
				key: 'goal.' + goal.id,
				name: goal.name,
				children: [],
			};

			sectionNode.children.push(goalNode);
			goalNodeMap[goal.id] = goalNode;
		});

		tasks.forEach((task) => {
			const goalNode = goalNodeMap[task.goalId];
			if (isNullOrUndefined(goalNode)) {
				return;
			}

			const taskNode = {
				id: task.id,
				type: TASK_NODE,
				key: 'task.' + task.id,
				name: task.name,
			};

			goalNode.children.push(taskNode);
		});

		return sectionNodes;
	};

	render() {
		const selectNodes = this.selectNodes();
		const goalModalProps = {
			projectId: this.props.specProject.id,
			sectionId: this.state.sectionId,
			createGoalVisible: this.state.createGoalVisible,
			ok: this.handleCreateGoalOk,
			cancel: this.handleCreateGoalCancel,
		};

		const taskModalProps = {
			projectId: this.props.specProject.id,
			goalId: this.state.goalId,
			createTaskVisible: this.state.createTaskVisible,
			ok: this.handleCreateTaskOk,
			cancel: this.handleCreateTaskCancel,
		};

		return (
			<div>
				<GoalCreateModal {...goalModalProps}/>
				<TaskCreateModal {...taskModalProps}/>

				<Table onRowClick={this.onRowClick} columns={this.columns} dataSource={selectNodes}
					   pagination={false} showHeader={false} size="small">
				</Table>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);

interface GoalCreateModalProps {
	projectId: number,
	sectionId: number,
	createGoalVisible: boolean;
	ok(goal: any);
	cancel();
}

class GoalCreateModal extends React.Component<GoalCreateModalProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			goalName: '',
		}
	}

	handleCreateGoalOk = () => {
		if (this.state.goalName.trim() === '') {
			return;
		}

		console.info('handleCreateGoalOk ' + this.props.sectionId);
		this.props.ok({
			projectId: this.props.projectId,
			sectionId: this.props.sectionId,
			name: this.state.goalName,
		})
	};

	handleCreateGoalCancel = () => {
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
				title="添加目标"
				visible={this.props.createGoalVisible}
				onOk={this.handleCreateGoalOk}
				onCancel={this.handleCreateGoalCancel}
			>
				<Input placeholder="请输入目标名" onChange={this.onGoalNameChange} value={this.state.goalName}/>
			</Modal>
		);
	}
}

interface TaskCreateModalProps {
	projectId: number,
	goalId: number,
	createTaskVisible: boolean;
	ok(task: any);
	cancel();
}

class TaskCreateModal extends React.Component<TaskCreateModalProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			taskName: '',
		}
	}

	handleCreateTaskOk = () => {
		if (this.state.taskName.trim() === '') {
			return;
		}

		console.info('handleCreateTaskOk ' + this.props.goalId);
		this.props.ok({
			projectId: this.props.projectId,
			goalId: this.props.goalId,
			name: this.state.taskName,
		})
	};

	handleCreateTaskCancel = () => {
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
				title="添加任务"
				visible={this.props.createTaskVisible}
				onOk={this.handleCreateTaskOk}
				onCancel={this.handleCreateTaskCancel}
			>
				<Input placeholder="请输入任务名" onChange={this.onTaskNameChange} value={this.state.taskName}/>
			</Modal>
		);
	}
}