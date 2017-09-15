import * as React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {bindActionCreators} from "redux";

interface StateProps {
}

interface DispatchProps {
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch)
};

class ShowIndex extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// 查询账号列表
		browserHistory.push('/wiki/wikiindex');
	}

	render() {
		return (
			<div></div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowIndex);
