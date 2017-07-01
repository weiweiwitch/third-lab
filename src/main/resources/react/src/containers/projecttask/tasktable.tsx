import * as React from "react";
import {Button, Collapse, Icon, Popover, Table} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteProjectSection} from "../../sagas/projectsections";
import {deleteProjectGoal} from "../../sagas/projectgoals";
import {deleteProjectTask} from "../../sagas/projecttasks";
import SectionModal from './sectionModal';
import TaskModal from "./taskModal";
import GoalModal from "./goalModal";
import {isNullOrUndefined} from "util";

const Panel = Collapse.Panel;

export const SECTION_NODE = 1;
export const GOAL_NODE = 2;
export const TASK_NODE = 3;

export interface ITask {
	id: number;
	name: string;
	type: number;
	key: string;
	expand: boolean;
}

interface ISectionNode extends ITask {
	children: IGoalNode[];
}

interface IGoalNode extends ITask {
	parent: ISectionNode;
	children: ITaskNode[];
}

interface ITaskNode extends ITask {
	parent: IGoalNode;
}

interface StateProps {
	specProject: any;
	sectionsOfSpecProject: any[];
	goalsOfSpecProject: any[];
	tasksOfSpecProject: any[];
}

interface DispatchProps {
	deleteProjectSection(sectionId: number);
	deleteProjectGoal(goalId: number);
	deleteProjectTask(taskId: number);
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
		deleteProjectSection: deleteProjectSection,
		deleteProjectGoal: deleteProjectGoal,
		deleteProjectTask: deleteProjectTask,
	}, dispatch)
};

interface ITaskTableState {
	selectedSection: ISectionNode;
	selectedGoal: IGoalNode;
	selectedTask: ITaskNode;
	sectionModalVisible: boolean;
	goalModalVisible: boolean;
	taskModalVisible: boolean;
	editTaskVisible: boolean;
	atCreate: boolean;
	nodes: ITask[];
	expands: any[];
}

class TaskTable extends React.Component<AppProps, ITaskTableState> {

	constructor(props) {
		super(props);

		const {nodeTree, nodes} = this.selectNodes(props);
		const expands = nodes.map(item => item.key);
		this.state = {
			selectedSection: {
				id: 0,
				type: SECTION_NODE,
				key: 'section.' + 0,
				name: '',
				expand: true,
				children: [],
			},
			selectedGoal: {
				id: 0,
				type: GOAL_NODE,
				key: 'goal.' + 0,
				name: '',
				expand: true,
				parent: null,
				children: [],
			},
			selectedTask: {
				id: 0,
				type: TASK_NODE,
				key: 'task.' + 0,
				name: '',
				parent: null,
				expand: true,
			},
			sectionModalVisible: false,
			goalModalVisible: false,
			taskModalVisible: false,
			editTaskVisible: false,
			atCreate: true,
			nodes: nodeTree,
			expands: expands,
		}
	}

	componentWillReceiveProps(nextProps) {
		const {nodeTree, nodes} = this.selectNodes(nextProps);
		const expands = nodes.map(item => item.key);
		console.info(expands);
		this.setState({
			nodes: nodeTree,
			expands: expands,
		})
	}

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

	onClick4EditTask = (record) => {
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
			if (record.type === GOAL_NODE) {
				const goal = record as IGoalNode;
				pop = (<span><Popover content={
						<div>
							<div><Button onClick={() => this.onClick4EditGoal(record)}>编辑</Button></div>
							<div><Button onClick={() => this.onClick4DelGoal(record)}
										 disabled={goal.children.length !== 0}>删除</Button></div>
							<div><Button onClick={() => this.onClick4CreateTask(record)}>添加任务</Button></div>
						</div>
					} trigger="click"><Icon type="ellipsis"/></Popover></span>
				);
			} else {
				pop = (<span><Popover content={
						<div>
							<div><Button onClick={() => this.onClick4EditTask(record)}>编辑</Button></div>
							<div><Button onClick={() => this.onClick4DelTask(record)}>删除</Button></div>
						</div>
					} trigger="click"><Icon type="ellipsis"/></Popover></span>
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

	selectNodes = (props): { nodeTree: ISectionNode[], nodes: ITask[] } => {
		const sections = props.sectionsOfSpecProject;
		const goals = props.goalsOfSpecProject;
		const tasks = props.tasksOfSpecProject;

		const nodes: ITask[] = [];
		const sectionNodes: ISectionNode[] = [];
		const sectionNodeMap: Map<number, ISectionNode> = new Map<number, ISectionNode>();
		sections.forEach((section) => {
			const sectionNode = {
				id: section.id,
				type: SECTION_NODE,
				key: 'section.' + section.id,
				name: section.name,
				expand: true,
				children: [],
			};

			sectionNodes.push(sectionNode);
			nodes.push(sectionNode);
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
				expand: true,
				parent: sectionNode,
				children: [],
			};

			sectionNode.children.push(goalNode);
			nodes.push(goalNode);
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
				parent: goalNode,
				expand: true,
			};

			goalNode.children.push(taskNode);
			nodes.push(taskNode);
		});

		return {nodeTree: sectionNodes, nodes: nodes};
	};

	onPanelChange = (key) => {
		console.info(key);
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

		const nodeTree = this.state.nodes;
		const panelActiveKeys = nodeTree.map(item => item.key);
		return (
			<div>
				<SectionModal {...sectionModalProps}/>
				<GoalModal {...goalModalProps}/>
				<TaskModal {...taskModalProps}/>

				<Collapse bordered={false} activeKey={panelActiveKeys} onChange={this.onPanelChange}>
					{
						nodeTree.map((section: ISectionNode) => {
							const expands = section.children.map((goal: IGoalNode) => goal.key);

							return (
								<Panel header={
									<span>{section.name}<Popover content={
										<div>
											<Button onClick={() => this.onClick4EditSection(section)}>编辑</Button>
											<Button onClick={() => this.onClick4DelSection(section)}
													disabled={section.children.length !== 0}>删除</Button>
											<Button onClick={() => this.onClick4CreateGoal(section)}>添加目标</Button>
										</div>
									} trigger="click"><Icon type="ellipsis"/>
								</Popover></span>} key={section.key}>
									<Table expandedRowKeys={this.state.expands} onRowClick={this.onRowClick}
										   columns={this.columns} dataSource={section.children}
										   pagination={false} showHeader={false} size="small">
									</Table>
								</Panel>
							);
						})
					}
				</Collapse>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);

