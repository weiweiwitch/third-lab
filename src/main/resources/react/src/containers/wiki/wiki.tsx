import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";
import {Col, Row} from "antd";
import {Layout} from 'antd';
import { Table, Icon } from 'antd';

import WikiTree from "../wikitree/wikitree";
import WikiTagTree from "../wikitree/wikitagtree";
import {loginSuccess} from '../../sagas/auth';
import {querySpecPost} from '../../sagas/posts';

require('./wiki.scss');

const {Header, Footer, Sider, Content} = Layout;

interface StateProps {
	children?: any; // 子组件
	wikiposts: any[];
}

interface DispatchProps {
	pushState(nextLocation: any);
	loginSuccess();
	querySpecPost(postId: number);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		wikiposts: state.wikiposts.wikiposts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
		loginSuccess: loginSuccess,
		querySpecPost: querySpecPost,
	}, dispatch)
};

class Wiki extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loginSuccess();
	}

	onRowClick = (record, index) => {
		// 查询特定文章
		this.props.querySpecPost(record.id);

		// 切换页面
		this.props.pushState('/wiki/wikipost/' + record.id);
	};

	render() {
		const columns = [{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		}];

		const posts = this.props.wikiposts;

		return (
			<Row style={{padding: '0px',}}>
				<Col span={3} style={{
					height: 'calc(100vh - 64px)',
					padding: '12px 24px',
					background: '#fff',
					overflowX: 'hidden',
					overflowY: 'auto',
				}}>
					<div>
						<WikiTagTree />
					</div>
				</Col>
				<Col span={5} style={{
					height: 'calc(100vh - 64px)',
					padding: '12px 24px',
					background: '#fff',
					overflowX: 'hidden',
					overflowY: 'auto',
				}}>
					<Table size="small" pagination={false} onRowClick={this.onRowClick} columns={columns} dataSource={posts} rowKey="id"/>
				</Col>
				<Col span={16} style={{
					height: 'calc(100vh - 64px)',
					display: 'inline-block',
					padding: '12px 24px',
					overflowY: 'auto',
				}}>
					{this.props.children}
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wiki);