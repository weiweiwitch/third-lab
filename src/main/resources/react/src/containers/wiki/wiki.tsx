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
			<Row style={{padding: '0px',}}>
				<Col span={4} style={{
					height: 'calc(100vh - 64px)',
					padding: '12px 24px',
					background: '#fff',
					overflowX: 'hidden',
					overflowY: 'auto',
				}}>
					<WikiTree />
				</Col>
				<Col span={20} style={{
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

export default connect(mapStateToProps, (dispatch) => {
	return bindActionCreators({
		queryPosts: queryPosts,
	}, dispatch)
})(Wiki);