import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";
import {Button, Col, Input, Modal, Row, Table} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {addProject, deleteProject, chgProject, querySpecProject} from '../../sagas/projects';

interface StateProps {
	children?: any; // 子组件
	projects: any[];
}

interface DispatchProps {
	pushState(nextLocation: any);
	addProject(project: any);
	deleteProject(id: number);
	chgProject(id, data);
	querySpecProject(projectId: number);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		projects: state.projects.projects,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
		addProject: addProject,
		deleteProject: deleteProject,
		chgProject: chgProject,
		querySpecProject: querySpecProject,
	}, dispatch)
};

interface IProject {
	id: number;
	name: string;
}

class Project extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			createVisible: false,
			modifyVisible: false,
			projectName: '',
			modifyProjectId: 0,
		};
	}

	onDelProject = (record) => {
		this.props.deleteProject(record.id);
	};

	onEditProject = (record) => {
		this.setState({
			modifyVisible: true,
			projectName: record.name,
			modifyProjectId: record.id,
		});
	};

	columns: TableColumnConfig<IProject>[] = [{
		key: 'id',
		title: '名称',
		dataIndex: 'name',
	}, {
		key: 'op',
		title: '操作',
		render: (text, record) => {
			return (
				<div>
					<Button onClick={() => {
						this.onDelProject(record);
					}} type="danger" shape="circle" icon="delete"/>
					<Button onClick={() => {
						this.onEditProject(record);
					}} type="danger" shape="circle" icon="edit"/>
				</div>
			);
		},
	}];

	showAddProjectModal = () => {
		this.setState({
			createVisible: true,
		});
	};

	handleCreateProjectOk = () => {
		if (this.state.projectName.trim() !== '') {
			this.props.addProject({
				name: this.state.projectName,
				groupId: 0,
			});
		}

		this.setState({
			createVisible: false,
			projectName: '',
		});
	};

	handleCreateProjectCancel = (e) => {
		this.setState({
			createVisible: false,
			projectName: '',
		});
	};

	handleModifyProjectOk = () => {
		if (this.state.projectName.trim() !== '') {
			this.props.chgProject(this.state.modifyProjectId, {
				name: this.state.projectName,
				groupId: 0,
			});
		}

		this.setState({
			modifyVisible: false,
			projectName: '',
		});
	};

	handleModifyProjectCancel = () => {
		this.setState({
			modifyVisible: false,
			projectName: '',
		});
	};

	onProjectNameChange = (event) => {
		this.setState({
			projectName: event.target.value,
		});
	};

	onRowClick = (record, index) => {
		console.info(record);

		// 查询任务
		this.props.querySpecProject(record.id);

		// 可能的话，切换到任务页面
		this.props.pushState('/project/projecttask');
	};

	render() {
		const projects = this.props.projects;

		return (
			<Row>
				<Modal
					title="添加项目"
					visible={this.state.createVisible}
					onOk={this.handleCreateProjectOk}
					onCancel={this.handleCreateProjectCancel}
				>
					<Input placeholder="项目名" onChange={this.onProjectNameChange} value={this.state.projectName}/>
				</Modal>
				<Modal
					title="修改项目"
					visible={this.state.modifyVisible}
					onOk={this.handleModifyProjectOk}
					onCancel={this.handleModifyProjectCancel}
				>
					<Input placeholder="项目名" onChange={this.onProjectNameChange} value={this.state.projectName}/>
				</Modal>

				<Col span={6} style={{padding: '0px 12px',}}>
					<Row>
						<Col span={24}>
							<Button onClick={this.showAddProjectModal}>添加项目</Button>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Table rowKey="id" onRowClick={this.onRowClick} columns={this.columns} dataSource={projects}
								   pagination={false} showHeader={false} size="small">
							</Table>
						</Col>
					</Row>
				</Col>
				<Col span={18} style={{padding: '0px 12px',}}>
					{this.props.children}
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);