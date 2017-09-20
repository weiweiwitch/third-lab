import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {bindActionCreators} from "redux";
import {Col, Input, Row, Table} from "antd";

import {querySpecPost, showPost} from "../../sagas/posts";
import {withRouter} from "react-router";

interface IStateProps {
	history: History;
	wikiposts: any[];
}

interface IDispatchProps {
	querySpecPost(postId: number): any;

	showPost(postId: number): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		wikiposts: state.wikiposts.wikiposts,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		querySpecPost,
		showPost,
	}, dispatch);
};

interface IState {
	searchSource: any[];
}

class WikiIndex extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		this.state = {
			searchSource: [],
		};
	}

	handleUpdateInput = (event: any): any => {
		const keyword = event.target.value;
		if (keyword.trim() === '') {
			this.setState({
				searchSource: [],
			});
		} else {
			const wikiposts = this.props.wikiposts;
			const filterPosts = [];
			this.searchEachNode(keyword, wikiposts, filterPosts);

			this.setState({
				searchSource: filterPosts,
			});
		}
	};

	searchEachNode(keyword: any, wikiposts: any, filterPosts: any): any {
		for (const post of wikiposts) {
			if (post.title.includes(keyword)) {
				filterPosts.push({
					id: post.id,
					text: post.title,
					value: post,
				});
			}
		}
	}

	onRowClick = (record: any, index: any): any => {
		// 查询特定文章
		this.props.querySpecPost(record.id);

		// 切换页面
		this.props.showPost(record.id);
	};

	showPost = (chosenRequest: any, index: any): any => {
		if (index !== -1) {
			const postId = this.state.searchSource[index].value.id;
			this.props.showPost(postId);
		}
	};

	render(): any {
		const columns = [{
			title: '标题',
			dataIndex: 'text',
		}];

		return (
			<Row>
				<Col span={24}>
					<Row>
						<Col span={24} style={{padding: '12px 0px'}}>
							<Input placeholder="搜索" onChange={this.handleUpdateInput}/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Table size="small" pagination={false} onRowClick={this.onRowClick}
								   columns={columns}
								   dataSource={this.state.searchSource} rowKey="id"/>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WikiIndex));