import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {Input, Col, Row, Table} from "antd";

import {queryPosts, querySpecPost} from "../../sagas/posts";

interface StateProps {
	wikiposts: any[],
}

interface DispatchProps {
	pushState(nextLocation: any);
	querySpecPost(postId: number);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {
		wikiposts: state.wikiposts.wikiposts
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushState: push,
		querySpecPost: querySpecPost,
	}, dispatch)
};

class WikiIndex extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			searchSource: []
		};
	}

	handleUpdateInput = (event) => {
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

	searchEachNode(keyword, wikiposts, filterPosts) {
		for (const post of wikiposts) {
			if (post.title.includes(keyword)) {
				filterPosts.push({
					id: post.id,
					text: post.title,
					value: post
				});
			}
		}
	}

	onRowClick = (record, index) => {
		// 查询特定文章
		this.props.querySpecPost(record.id);

		// 切换页面
		this.props.pushState('/wiki/wikipost/' + record.id);
	};

	showPost = (chosenRequest, index) => {
		console.info(index);
		if (index !== -1) {
			const post = this.state.searchSource[index].value;
			console.info(post);
			this.props.pushState('/wiki/wikipost/' + post.id);
		}
	};

	render() {
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