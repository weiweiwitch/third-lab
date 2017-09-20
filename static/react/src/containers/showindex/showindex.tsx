import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {History} from 'history';

interface IStateProps {
	history: History;
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
		this.props.history.push('/wiki/wikiindex');
	}

	render(): any {
		return (
			<div></div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowIndex);
