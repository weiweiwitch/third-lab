import * as React from "react";
import {Button, Collapse, Icon, Popover, Table, Row, Col, Input} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addProjectSection} from "../../sagas/projectsections";
import {deleteProjectSection} from "../../sagas/projectsections";
import {deleteProjectGoal} from "../../sagas/projectgoals";
import {deleteProjectTask, chgProjectTask} from "../../sagas/projecttasks";
import SectionModal from "./sectionModal";
import TaskModal from "./taskModal";
import GoalModal from "./goalModal";
import RelyGoalModal from './relyGoalModal';
import {isNullOrUndefined} from "util";

const Panel = Collapse.Panel;

export const SECTION_NODE = 1;
export const GOAL_NODE = 2;
export const TASK_NODE = 3;

export interface INode {
	id: number;
	name: string;
	type: number;
	key: string;
}

interface ISectionNode extends INode {
	children: IGoalNode[];
}

export interface IGoalNode extends INode {
	parent: ISectionNode;
	topTask: ITaskNode;
	children: ITaskNode[];
}

export interface ITaskNode extends INode {
	parent: IGoalNode;
	nextTaskId: number;
	relyGoalId: number;
	nextTask?: ITaskNode;
	lastTask?: ITaskNode;
}

interface StateProps {
	specProject: any;
	nodeTree: ISectionNode[];
}

interface DispatchProps {
	addProjectSection(section: any);
	deleteProjectSection(sectionId: number);
	deleteProjectGoal(goalId: number);
	deleteProjectTask(taskId: number);
	chgProjectTask(taskId: number, task: any);
}

type AppProps = StateProps & DispatchProps;

const selectNodes = (props): { nodeTree: ISectionNode[] } => {
	const sections = props.projects.sectionsOfSpecProject;
	const goals = props.projects.goalsOfSpecProject;
	const tasks = props.projects.tasksOfSpecProject;

	const sectionNodeTree: ISectionNode[] = [];
	const sectionNodeMap: Map<number, ISectionNode> = new Map<number, ISectionNode>();
	sections.forEach((section) => {
		const sectionNode: ISectionNode = {
			id: section.id,
			type: SECTION_NODE,
			key: 'section.' + section.id,
			name: section.name,
			children: [],
		};

		sectionNodeTree.push(sectionNode);
		sectionNodeMap[section.id] = sectionNode;
	});

	const goalNodeMap: Map<number, IGoalNode> = new Map<number, IGoalNode>();
	goals.forEach((goal) => {
		const sectionNode = sectionNodeMap[goal.sectionId];
		if (isNullOrUndefined(sectionNode)) {
			return;
		}

		const goalNode: IGoalNode = {
			id: goal.id,
			type: GOAL_NODE,
			key: 'goal.' + goal.id,
			name: goal.name,
			parent: sectionNode,
			topTask: null,
			children: [],
		};

		sectionNode.children.push(goalNode);
		goalNodeMap[goal.id] = goalNode;
	});

	const taskMap: Map<number, ITaskNode> = new Map<number, ITaskNode>();
	tasks.forEach((task) => {
		const goalNode = goalNodeMap[task.goalId];
		if (isNullOrUndefined(goalNode)) {
			return;
		}

		const taskNode: ITaskNode = {
			id: task.id,
			type: TASK_NODE,
			key: 'task.' + task.id,
			name: task.name,
			parent: goalNode,
			nextTaskId: task.nextTaskId,
			relyGoalId: task.relyGoalId,
		};

		goalNode.children.push(taskNode);
		taskMap[taskNode.id] = taskNode;
	});

	// 对任务按照nextTask进行排序
	sectionNodeTree.forEach((sectionNode: ISectionNode) => {
		sectionNode.children.forEach((goalNode: IGoalNode) => {
			const tasks: Array<ITaskNode> = goalNode.children;
			if (tasks.length == 0) {
				return;
			}

			let lastTask: ITaskNode = null;
			tasks.forEach((task: ITaskNode) => {
				if (task.nextTaskId !== 0) {
					const nextTask = taskMap[task.nextTaskId];
					if (!isNullOrUndefined(nextTask)) {
						task.nextTask = nextTask;
						nextTask.lastTask = task;
					}
				} else {
					lastTask = task;
				}
			});

			const sortedTasks: ITaskNode[] = [];
			let currentTask = lastTask;
			do {
				sortedTasks.unshift(currentTask);
				currentTask = currentTask.lastTask;
			} while (!isNullOrUndefined(currentTask));

			goalNode.children = sortedTasks;
		});
	});

	return {nodeTree: sectionNodeTree};
};

const mapStateToProps = (state) => {
	return {
		specProject: state.projects.specProject,
		nodeTree: selectNodes(state).nodeTree,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addProjectSection: addProjectSection,
		deleteProjectSection: deleteProjectSection,
		deleteProjectGoal: deleteProjectGoal,
		deleteProjectTask: deleteProjectTask,
		chgProjectTask: chgProjectTask,
	}, dispatch)
};

interface IArchTableState {
	newSectionName: string;
	selectedSection: ISectionNode;
	selectedGoal: IGoalNode;
	selectedTask: ITaskNode;
	sectionModalVisible: boolean;
	goalModalVisible: boolean;
	taskModalVisible: boolean;
	editTaskVisible: boolean;
	relyGoalModalVisible: boolean;
	atCreate: boolean;
}

class ArchTable extends React.Component<AppProps, IArchTableState> {

	constructor(props) {
		super(props);

		this.state = {
			newSectionName: '',
			selectedSection: {
				id: 0,
				type: SECTION_NODE,
				key: 'section.' + 0,
				name: '',
				children: [],
			},
			selectedGoal: {
				id: 0,
				type: GOAL_NODE,
				key: 'goal.' + 0,
				name: '',
				parent: null,
				topTask: null,
				children: [],
			},
			selectedTask: {
				id: 0,
				type: TASK_NODE,
				key: 'task.' + 0,
				name: '',
				parent: null,
				nextTaskId: 0,
				relyGoalId: 0,
			},
			sectionModalVisible: false,
			goalModalVisible: false,
			taskModalVisible: false,
			editTaskVisible: false,
			relyGoalModalVisible: false,
			atCreate: true,
		}
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

	onRowClick = (record, index) => {

	};

	onClick4EditSection = (record) => {
		this.setState({
			selectedSection: record,
			atCreate: false,
			sectionModalVisible: true,
		});
	};

	onClick4DelSection = (record) => {
		this.props.deleteProjectSection(record.id);
	};

	onClick4CreateGoal = (record) => {
		this.setState({
			selectedSection: record,
			atCreate: true,
			goalModalVisible: true,
		});
	};

	onClick4EditGoal = (record) => {
		this.setState({
			selectedSection: record.parent,
			selectedGoal: record,
			atCreate: false,
			goalModalVisible: true,
		});
	};

	onClick4DelGoal = (record) => {
		this.props.deleteProjectGoal(record.id);
	};

	onClick4CreateTask = (record) => {
		console.info('设置goalId ' + record.id);
		this.setState({
			selectedGoal: record,
			atCreate: true,
			taskModalVisible: true,
		});
	};

	onClick4EditTask = (record: ITaskNode) => {
		this.setState({
			selectedGoal: record.parent,
			selectedTask: record,
			atCreate: false,
			taskModalVisible: true,
		});
	};

	onClick4DelTask = record => {
		this.props.deleteProjectTask(record.id);
	};

	onClick4ConfigRelyGoal = (record) => {
		this.setState({
			selectedTask: record,
			relyGoalModalVisible: true,
		});
	};

	onTaskUp = (record: ITaskNode) => {
		const lastTask: ITaskNode = record.lastTask;
		if (isNullOrUndefined(lastTask)) {
			return;
		}

		this.props.chgProjectTask(record.id, {
			id: record.id,
			name: record.name,
			nextTaskId: lastTask.id,
			relyGoalId: record.relyGoalId,
			projectId: this.props.specProject.id,
			goalId: record.parent.id,
		});
	};

	onTaskDown = record => {
		const nextTask: ITaskNode = record.nextTask;
		if (isNullOrUndefined(nextTask)) {
			return;
		}

		let targetNextTaskId = 0;
		if (!isNullOrUndefined(nextTask.nextTask)) {
			// 下一个任务不是最后一个了。
			targetNextTaskId = nextTask.nextTask.id;
		}

		this.props.chgProjectTask(record.id, {
			id: record.id,
			name: record.name,
			nextTaskId: targetNextTaskId,
			projectId: this.props.specProject.id,
			goalId: record.parent.id,
		});
	};

	columns: TableColumnConfig<INode>[] = [{
		key: 'key',
		title: '名称',
		dataIndex: 'name',
		render: (text, record: INode) => {
			return (
				<span>{record.name}</span>
			);
		},
	}, {
		width: '100px',
		key: 'rely',
		title: '依赖目标',
		render: (text, record: INode) => {
			if (record.type === TASK_NODE) {
				let relyGoal: IGoalNode = null;
				let relyOn = false;
				const task = record as ITaskNode;
				if (task.relyGoalId !== 0) {
					this.props.nodeTree.forEach((section) => {
						section.children.forEach((goal) => {
							if (goal.id === task.relyGoalId) {
								relyGoal = goal;
								relyOn = true;
							}
						});
					});
				}
				if (relyOn) {
					return (<span onClick={() => this.onClick4ConfigRelyGoal(record)}>{relyGoal.name}</span>);
				} else {
					return (<span><Icon type="edit" onClick={() => this.onClick4ConfigRelyGoal(record)}/></span>);
				}

			} else {
				return <span />
			}
		},
	}, {
		width: '200px',
		key: 'op',
		title: '操作',
		render: (text, record: INode) => {
			let pop;
			if (record.type === SECTION_NODE) {
				const section = record as ISectionNode;
				pop = (
					<span>
						<Icon style={{paddingRight: 10}} type="edit" onClick={() => this.onClick4EditSection(section)}/>
						{
							section.children.length === 0 ? <Icon style={{paddingRight: 10}} type="delete"
																  onClick={() => this.onClick4DelSection(section)}/> :
								<span/>
						}
						<Icon style={{paddingRight: 10}} type="plus" onClick={() => this.onClick4CreateGoal(section)}/>
						</span>
				);
			} else if (record.type === GOAL_NODE) {
				const goal = record as IGoalNode;
				pop = (
					<span>
						<Icon style={{paddingRight: 10}} type="edit" onClick={() => this.onClick4EditGoal(goal)}/>
						{
							goal.children.length === 0 ? <Icon style={{paddingRight: 10}} type="delete"
															   onClick={() => this.onClick4DelGoal(goal)}/> : <span/>
						}
						<Icon style={{paddingRight: 10}} type="plus" onClick={() => this.onClick4CreateTask(goal)}/>
						</span>
				);
			} else {
				const task = record as ITaskNode;
				pop = (
					<span>
						<Icon style={{paddingRight: 10}} type="edit" onClick={() => this.onClick4EditTask(task)}/>
						<Icon style={{paddingRight: 10}} type="delete" onClick={() => this.onClick4DelTask(task)}/>
						<Icon style={{paddingRight: 10}} type="up" onClick={() => this.onTaskUp(task)}/>
						<Icon style={{paddingRight: 10}} type="down" onClick={() => this.onTaskDown(task)}/>
					</span>
				);
			}

			return (pop);
		},
	}];

	handleSectionOk = () => {
		this.setState({
			sectionModalVisible: false,
		});
	};

	handleSectionCancel = () => {
		this.setState({
			sectionModalVisible: false,
		});
	};

	handleGoalOk = () => {
		this.setState({
			goalModalVisible: false,
		});
	};

	handleGoalCancel = () => {
		this.setState({
			goalModalVisible: false,
		});
	};

	handleTaskOk = () => {
		this.setState({
			taskModalVisible: false,
		});
	};

	handleTaskCancel = () => {
		this.setState({
			taskModalVisible: false,
		});
	};

	handleRelyGoalOk = (selectedGoalId: number) => {
		const selectedTask = this.state.selectedTask;
		this.props.chgProjectTask(selectedTask.id, {
			id: selectedTask.id,
			name: selectedTask.name,
			nextTaskId: selectedTask.nextTaskId,
			relyGoalId: selectedGoalId,
			projectId: this.props.specProject.id,
			goalId: selectedTask.parent.id,
		});

		this.setState({
			relyGoalModalVisible: false,
		});
	};

	handleRelyGoalCancel = () => {
		this.setState({
			relyGoalModalVisible: false,
		});
	};

	render() {
		const sectionModalProps = {
			section: this.state.selectedSection,
			projectId: this.props.specProject.id,
			sectionModalVisible: this.state.sectionModalVisible,
			atCreate: this.state.atCreate,
			ok: this.handleSectionOk,
			cancel: this.handleSectionCancel,
		};

		const goalModalProps = {
			goal: this.state.selectedGoal,
			parentSection: this.state.selectedSection,
			projectId: this.props.specProject.id,
			goalModalVisible: this.state.goalModalVisible,
			atCreate: this.state.atCreate,
			ok: this.handleGoalOk,
			cancel: this.handleGoalCancel,
		};

		const taskModalProps = {
			task: this.state.selectedTask,
			parentGoal: this.state.selectedGoal,
			projectId: this.props.specProject.id,
			taskModalVisible: this.state.taskModalVisible,
			atCreate: this.state.atCreate,
			ok: this.handleTaskOk,
			cancel: this.handleTaskCancel,
		};

		const relyGoalModalProps = {
			selfGoalId: isNullOrUndefined(this.state.selectedTask.parent) ? 0 : this.state.selectedTask.parent.id,
			relyGoalId: this.state.selectedTask.relyGoalId,
			modalVisible: this.state.relyGoalModalVisible,
			ok: this.handleRelyGoalOk,
			cancel: this.handleRelyGoalCancel,
		};

		const nodeTree = this.props.nodeTree;
		const expands = [];
		nodeTree.forEach((section: ISectionNode) => {
			expands.push(section.key);
			section.children.forEach((goal: IGoalNode) => expands.push(goal.key));
		});

		return (
			<Row>
				<SectionModal {...sectionModalProps}/>
				<GoalModal {...goalModalProps}/>
				<TaskModal {...taskModalProps}/>
				<RelyGoalModal {...relyGoalModalProps}/>
				<Col span={24}>
					<Row>
						<Col span={24}>
							<AddSectionInput onChange={this.onNewSectionChange}
											 onPressEnter={this.onNewSectionAdd}
											 value={this.state.newSectionName}/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Table expandedRowKeys={expands} onRowClick={this.onRowClick}
								   columns={this.columns} dataSource={nodeTree}
								   pagination={false} showHeader={false} size="small">
							</Table>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchTable);

interface AddSectionInputProps {
	onChange(event);
	onPressEnter(event);
	value: string;
}

const AddSectionInput: React.SFC<AddSectionInputProps> = ({onChange, onPressEnter, value}): React.ReactElement<any> => {
	return (<Input placeholder="添加目标组" onChange={onChange}
				   onPressEnter={onPressEnter} value={value}/>);
};