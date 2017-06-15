import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Col, Row} from "antd";
import {Layout} from 'antd';

import WikiTree from "../wikitree/wikitree";
import {queryPosts} from "../../sagas/posts";

require('./wiki.scss');

const {Header, Footer, Sider, Content} = Layout;

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
		this.props.queryPosts();
	}

	render() {
		return (
			<Layout style={{ height: 'calc(100vh - 120px)' }}>
				<Sider style={{ padding: '12px 24px', background: '#ddd', overflow: 'auto' }}>
					<WikiTree />
				</Sider>
				<Layout style={{ padding: '12px 24px', overflow: 'auto' }}>
					{this.props.children}
				</Layout>
			</Layout>
		);
	}
}

export default connect(mapStateToProps, (dispatch) => {
	return bindActionCreators({
		queryPosts: queryPosts,
	}, dispatch)
})(Wiki);