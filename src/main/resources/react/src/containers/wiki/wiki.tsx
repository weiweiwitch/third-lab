import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Col, Row} from "antd";

import WikiTree from "../wikitree/wikitree";
import {queryPosts} from "../../sagas/posts";

require('./wiki.scss');

interface StateProps {
	children?: any // 子组件
}

interface DispatchProps {
	queryPosts();
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {};
}

class Wiki extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.info('queryPosts');
		this.props.queryPosts();
	}

	render() {
		return (
			<Row>
				<Col span={4}>
					<WikiTree />
				</Col>
				<Col span={20}>
					{this.props.children}
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, (dispatch) => {
	return bindActionCreators({
		queryPosts: queryPosts,
	}, dispatch)
})(Wiki);