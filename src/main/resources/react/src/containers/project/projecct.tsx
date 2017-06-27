import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";
import {Button, Col, Row, Table} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import WikiTagTree from "../wikitree/wikitagtree";
import {loginSuccess} from "../../sagas/auth";
import {querySpecPost} from "../../sagas/posts";
import Column from "antd/lib/table/Column";

interface StateProps {
	children?: any; // 子组件
}

interface DispatchProps {
	pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
	}, dispatch)
};

interface IProject {
	key: number;
	name: string;
}


const columns: TableColumnConfig<IProject>[] = [{
	key: 'name',
	title: '名称',
	dataIndex: 'name',
}];

class Project extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	render() {
		const projects = [];

		return (
			<Row>
				<Col span={6}>
					<Row>
						<Col span={24}>
							<Button >添加项目</Button>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Table columns={columns} dataSource={projects}>
							</Table>
						</Col>
					</Row>
				</Col>
				<Col span={18}>

				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);