import * as React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {bindActionCreators} from "redux";

interface IStateProps {
}

interface IDispatchProps {
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({}, dispatch);
};

class ShowIndex extends React.Component<IAppProps, any> {

	constructor(props: IAppProps) {
		super(props);
	}

	componentDidMount(): any {
		// 查询账号列表
		browserHistory.push('/wiki/wikiindex');
	}

	render(): any {
		return (
			<div></div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowIndex);
