import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {match, Route, Switch, withRouter} from "react-router";
import {Button, Input, Col, Row, Table, Modal} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {History} from 'history';

import WikiTagTree from "../wikitree/wikitagtree";
import WikiIndex from "../wikiindex/wikiindex";
import WikiNew from "../wikinew/wikinew";
import WikiEdit from "../wikiedit/wikiedit";
import WikiPost from "../wikipost/wikipost";
import WikiTagEdit from '../wikitagedit/wikitagedit';

import {loginSuccess} from "../../sagas/auth";
import {querySpecPost, prepareCreatePost, showPost} from "../../sagas/posts";
import {WikiPostsState} from "../../redux/modules/wikiposts";
import {WikiTagsState} from "../../redux/modules/wikitags";
import {changeTag} from "../../sagas/tags";

// import {} from "./wiki.scss";
require('./wiki.scss');

interface IStateProps {
	match: match<any>;
	history: History;

	postsOfSpecTag: any[];
	specTagId: number;
	wikitaglist: any[];
}

interface IDispatchProps {
	loginSuccess(): any;

	querySpecPost(postId: number): any;

	prepareCreatePost(parentId: number): any;

	showPost(postId: number): any;

	changeTag(tagId: number, data: any): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	const wikiposts: WikiPostsState = state.wikiposts;
	const wikitags: WikiTagsState = state.wikitags;

	return {
		postsOfSpecTag: wikiposts.postsOfSpecTag,
		specTagId: wikitags.specTagId,
		wikitaglist: wikitags.wikitaglist,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		loginSuccess,
		querySpecPost,
		prepareCreatePost,
		showPost,
		changeTag,
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

interface IState {
}

class Wiki extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		this.state = {
		};
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

	// 切换到创建post的页面
	showCreatePostPage = (): any => {
		this.props.prepareCreatePost(0);
	};

	// 显示编辑TAG的对话框，修改TAG的关联关系
	showEditTagPage = (): any => {
		this.props.history.push('/wiki/wikitagedit');
	};

	render(): any {
		const postsOfSpecTag: IPost[] = this.props.postsOfSpecTag;

		let specTag = '';
		this.props.wikitaglist.map((tag: any): any => {
			if (tag.id === this.props.specTagId) {
				specTag = tag.tagName;
			}
		});

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
								<Button type="primary" onClick={this.showCreatePostPage}>创建</Button>
								<Button type="primary" onClick={this.showEditTagPage}
										disabled={this.props.specTagId === 0}>编辑标签：{specTag}</Button>
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
							<Route path={`${this.props.match.path}/wikitagedit`} component={WikiTagEdit}/>
						</Switch>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wiki));
