import * as React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {bindActionCreators} from "redux";
import {Input, Col, Row, Table} from "antd";

import {queryPosts, querySpecPost} from "../../sagas/posts";

interface IStateProps {
	wikiposts: any[];
}

interface IDispatchProps {
	querySpecPost(postId: number): any;
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
	}, dispatch);
};

class WikiIndex extends React.Component<IAppProps, any> {

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
		browserHistory.push('/wiki/wikipost/' + record.id);
	};

	showPost = (chosenRequest: any, index: any): any => {
		if (index !== -1) {
			const post = this.state.searchSource[index].value;
			browserHistory.push('/wiki/wikipost/' + post.id);
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

export default connect(mapStateToProps, mapDispatchToProps)(WikiIndex);