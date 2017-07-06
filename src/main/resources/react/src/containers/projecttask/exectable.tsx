import * as React from "react";
import {Col, Row, Table} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {isNullOrUndefined} from "util";

interface IExecNode {
	key: number;
	id: number;
	name: string;
	nextTaskId: number;
	nextTask?: IExecNode;
	lastTask?: IExecNode;
}

interface IGoalNode {
	lastGoal: IGoalNode;
	nextGoal: IGoalNode;
	children: IExecNode[];
}

interface StateProps {
	nodes: IExecNode[];
}

interface DispatchProps {

}

type AppProps = StateProps & DispatchProps;

const prepareNodes = (state): IExecNode[] => {
	const goalMap = new Map<number, IGoalNode>();
	const goals: IGoalNode[] = [];
	const relyGoalMap = new Map<number, number>();
	const taskMap: Map<number, IExecNode> = new Map<number, IExecNode>();
	state.projects.tasksOfSpecProject.forEach((task) => {
		const taskNode: IExecNode = {
			key: task.id,
			id: task.id,
			name: task.name,
			nextTaskId: task.nextTaskId,
		};
		taskMap[task.id] = taskNode;

		let goal: IGoalNode = goalMap[task.goalId];
		if (isNullOrUndefined(goal)) {
			goal = {
				lastGoal: null,
				nextGoal: null,
				children: [],
			};
			goalMap[task.goalId] = goal;
			goals.push(goal);
		}
		goal.children.push(taskNode);
		return taskNode;
	});

	// 对目标内任务排序
	goals.forEach((goalNode: IGoalNode) => {
		let tasks = goalNode.children;
		if (tasks.length == 0) {
			return;
		}

		let lastTask: IExecNode = null;
		tasks.forEach((task: IExecNode) => {
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

		const sortedTasks: IExecNode[] = [];
		let currentTask: IExecNode = lastTask;
		do {
			sortedTasks.unshift(currentTask);
			currentTask = currentTask.lastTask;
		} while (!isNullOrUndefined(currentTask));

		goalNode.children = sortedTasks;
	});

	// 对目标根据依赖关系排序

	// 生成新的任务次序表
	const nodes: IExecNode[] = [];
	goals.forEach((goal: IGoalNode) => {
		goal.children.forEach((task: IExecNode) => {
			nodes.push(task);
		});
	});

	return nodes;
};

const mapStateToProps = (state) => {
	return {
		nodes: prepareNodes(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch)
};

interface IExecTableState {

}

class ExecTable extends React.Component<AppProps, IExecTableState> {
	columns: TableColumnConfig<IExecNode>[] = [{
		key: 'key',
		title: '名称',
		render: (text, record: IExecNode) => {
			return (
				<span>{record.name}</span>
			);
		},
	}];

	render() {
		const nodes = this.props.nodes;

		return (
			<Row>
				<Col span={24}>
					<Row>
						<Col span={24}>
							<Table columns={this.columns} dataSource={nodes}
								   pagination={false} showHeader={false} size="small">
							</Table>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecTable);