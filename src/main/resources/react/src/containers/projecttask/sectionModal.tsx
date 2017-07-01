import * as React from "react";
import {Input, Modal} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addProjectSection, chgProjectSection} from "../../sagas/projectsections";

interface StateProps {
	section: any;
	projectId: number;
	sectionModalVisible: boolean;
	atCreate: boolean;
}

interface DispatchProps {
	ok();
	cancel();
	addProjectSection(section: any);
	chgProjectSection(sectionId: number, section: any);
}

type AppProps = StateProps & DispatchProps;

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addProjectSection: addProjectSection,
		chgProjectSection: chgProjectSection,
	}, dispatch)
};

interface SectionModalState {
	id: number;
	sectionName: string;
}

class SectionModal extends React.Component<AppProps, SectionModalState> {

	constructor(props) {
		super(props);

		this.syncState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.syncState(nextProps);
	}

	syncState(props) {
		if (props.atCreate) {
			this.state = {
				id: 0,
				sectionName: '',
			};

		} else {
			console.info('编辑目标组名：' + props.section.name);
			this.state = {
				id: props.section.id,
				sectionName: props.section.name,
			};
		}
	}

	handleOk = () => {
		if (this.state.sectionName.trim() === '') {
			return;
		}

		const section = {
			id: this.state.id,
			name: this.state.sectionName,
			projectId: this.props.projectId,
		};
		if (this.props.atCreate) {
			this.props.addProjectSection(section);
		} else {
			this.props.chgProjectSection(section.id, section);
		}

		this.props.ok()
	};

	handleCancel = () => {
		this.props.cancel();
	};

	onSectionNameChange = (event) => {
		this.setState({
			sectionName: event.target.value,
		});
	};

	render() {
		return (
			<Modal
				title={this.props.atCreate ? "添加目标" : "编辑目标"}
				visible={this.props.sectionModalVisible}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
			>
				<Input placeholder="请输入目标名" onChange={this.onSectionNameChange} value={this.state.sectionName}/>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);