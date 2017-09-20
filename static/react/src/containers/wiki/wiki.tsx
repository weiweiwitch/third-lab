import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {match, Route, Switch, withRouter} from "react-router";
import {Button, Col, Row, Table} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {History} from 'history';

import WikiTagTree from "../wikitree/wikitagtree";
import WikiIndex from "../wikiindex/wikiindex";
import WikiNew from "../wikinew/wikinew";
import WikiEdit from "../wikiedit/wikiedit";
import WikiPost from "../wikipost/wikipost";

import {loginSuccess} from "../../sagas/auth";
import {querySpecPost, prepareCreatePost, showPost} from "../../sagas/posts";

// import {} from "./wiki.scss";
require('./wiki.scss');

interface IStateProps {
	match: match<any>;
	history: History;
	postsOfSpecTag: any[];
}

interface IDispatchProps {
	loginSuccess(): any;

	querySpecPost(postId: number): any;

	prepareCreatePost(parentId: number): any;

	showPost(postId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		postsOfSpecTag: state.wikiposts.postsOfSpecTag,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		loginSuccess,
		querySpecPost,
		prepareCreatePost,
		showPost,
	}, dispatch);
};

interface IPost {
	key: number;
	title: string;
}

const columns: Array<TableColumnConfig<IPost>> = [{
	key: 'title',
	title: '标题',
	dataIndex: 'title',
}];

const wikiTreeStyle: any = {
	height: 'calc(100vh - 64px)',
	padding: '0px',
	overflowX: 'hidden',
	overflowY: 'auto',
};

class Wiki extends React.Component<IAppProps, any> {

	constructor(props: IAppProps) {
		super(props);
	}

	componentDidMount(): any {
		this.props.loginSuccess();
	}

	onRowClick = (record: any, index: any): any => {
		// 查询特定文章
		this.props.querySpecPost(record.id);

		// 切换页面
		this.props.showPost(record.id);
	};

	createPost = (): any => {
		this.props.prepareCreatePost(0);
	};

	render(): any {
		const postsOfSpecTag: IPost[] = this.props.postsOfSpecTag;

		return (
			<div>
				<Row>
					<Col span={24}>
						<WikiTagTree/>
					</Col>
				</Row>
				<Row>
					<Col span={6} style={{
						padding: '0px 12px',
						background: '#fff',
					}}>
						<Row>
							<Col style={{
								padding: '0px 12px',
							}}>
								<Button type="primary" onClick={(event: any): any => {
									this.createPost();
								}}>创建</Button>
							</Col>
						</Row>
						<Row>
							<Col style={{
								height: 'calc(100vh - 164px)',
								padding: '12px 12px',
								overflowX: 'hidden',
								overflowY: 'auto',
							}}>
								<Table size="small" pagination={false} onRowClick={this.onRowClick}
									   columns={columns}
									   dataSource={postsOfSpecTag} rowKey="id"/>
							</Col>
						</Row>
					</Col>

					<Col span={18} style={{
						height: 'calc(100vh - 112px)',
						display: 'inline-block',
						padding: '12px 24px',
						overflowY: 'auto',
					}}>
						<Switch>
							<Route path={`${this.props.match.path}/wikiindex`} component={WikiIndex}/>
							<Route path={`${this.props.match.path}/wikinew/:parentId`} component={WikiNew}/>
							<Route path={`${this.props.match.path}/wikiedit`} component={WikiEdit}/>
							<Route path={`${this.props.match.path}/wikipost/:pId`} component={WikiPost}/>
						</Switch>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wiki));
