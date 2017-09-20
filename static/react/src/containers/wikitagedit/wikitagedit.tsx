import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {AutoComplete, Button, Col, Form, Input, Row, Tabs, Tag} from "antd";
import {bindActionCreators} from "redux";
import {isNullOrUndefined} from "util";
import {withRouter} from "react-router";
import {changeTag} from "../../sagas/tags";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

interface IStateProps {
	history: History;
	specTagId: number;
	wikitaglist: any[];
}

interface IDispatchProps {
	changeTag(tagId: number, data: any): any;
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any): any => {
	return {
		specTagId: state.wikitags.specTagId,
		wikitaglist: state.wikitags.wikitaglist,
	};
};

const mapDispatchToProps = (dispatch: any): any => {
	return bindActionCreators({
		changeTag,
	}, dispatch);
};

interface IState {
	tagName: string;
	parentTagId: number;
	showedParentTag: any[];
	tagSearchResult: any[];
	selectedTag: string;
	inputTag: string;
}

class WikiTagEdit extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		this.init(props);
	}

	componentWillReceiveProps(nextProps: IAppProps): any {
		this.init(nextProps);
	}

	init(props: IAppProps): any {
		let tagName = '';
		let parentTagId = 0;
		props.wikitaglist.filter((tag: any): any => {
			if (tag.id === props.specTagId) {
				tagName = tag.tagName;
				parentTagId = tag.parentTagId;
				return true;
			} else {
				return false;
			}
		});

		// 筛选出父tag表
		const showedParentTag = this.props.wikitaglist.filter((tag: any): any => {
			if (tag.id === parentTagId) {
				return true;
			} else {
				return false;
			}
		});

		this.state = {
			tagName,
			parentTagId,
			showedParentTag,
			tagSearchResult: [],
			selectedTag: '',
			inputTag: '',
		};
	}

	// 更新tag名
	updateTagName = (event: any): any => {
		this.setState({tagName: event.target.value});
	};

	confirmModify = (event: any): any => {
		event.preventDefault();

		const tagId = this.props.specTagId;
		const updatedTag = {
			name: this.state.tagName,
			parentTagId: this.state.parentTagId,
		};

		this.props.changeTag(tagId, updatedTag);
	};

	cancelModify = (event: any): any => {
		event.preventDefault();

		this.props.history.push('/wiki/wikiindex');
	};

	onTagSelect = (value: any): any => {
		this.setState({
			selectedTag: value,
		});
	};

	onTagSearch = (inputValue: any): any => {
		const searchResult = [];
		const existTagMap = new Map<string, boolean>();
		this.state.showedParentTag.map((postTag: any) => {
			existTagMap[postTag.tagName] = true;
		});
		this.props.wikitaglist.filter((value: any) => {
			if (isNullOrUndefined(existTagMap[value.tagName]) === false) {
				// 过滤掉已经添加给目标的tag
				return false;
			}
			if (value.tagName.indexOf(inputValue) === -1) {
				// 过滤掉和总tag表不符的。
				return false;
			}

			searchResult.push(value.tagName);
			return true;
		});

		this.setState({
			tagSearchResult: searchResult,
			inputTag: inputValue,
		});
	};

	onTagEnterPress = (event: any): any => {
		if (event.key === 'Enter') {
			// 按了回车
			const existTagMap = new Map<string, number>();
			this.state.showedParentTag.map((postTag: any) => {
				existTagMap[postTag.tagName] = postTag;
			});

			let newParentTag = null;
			let selectedNewParentTag = false;
			const selectedTagName = this.state.selectedTag;
			if (selectedTagName !== '') {
				// 判断这个tag是否已经存在
				if (isNullOrUndefined(existTagMap[selectedTagName]) === false) {
					// 已经存在了
					return;
				}

				this.props.wikitaglist.map((tag: any): any => {
					if (tag.tagName === selectedTagName) {
						newParentTag = tag;
						selectedNewParentTag = true;
					}
				});
				if (selectedNewParentTag === false) {
					return;
				}

			} else {
				return;
			}

			this.setState({
				parentTagId: newParentTag.id,
				showedParentTag: [newParentTag],
				selectedTag: '', // 清空选择
				inputTag: '',
			});
		}
	};

	tagClose = (tag: any): any => {
		const remainings = this.state.showedParentTag.filter((record: any, index: any) => {
			return record === tag ? false : true;
		});
		if (remainings.length > 0) {
			return;
		}

		this.setState({
			parentTagId: 0,
			showedParentTag: [],
		});
	};

	render(): any {
		const post = this.props.specTagId;

		const formItemLayout = {
			labelCol: {span: 6},
			wrapperCol: {span: 14},
		};
		const formItemLayout2 = {
			labelCol: {span: 0},
			wrapperCol: {span: 24},
		};

		const tags = this.state.showedParentTag.map((tag: any) => {
			return (
				<Tag key={tag.id} closable afterClose={(): any => this.tagClose(tag)}>{tag.tagName}</Tag>
			);
		});

		const allTags = this.state.tagSearchResult;

		return (
			<Row>
				<Col span={24}>
					<Form>
						<Row>
							<Col span={24} style={{padding: '12px 0px'}}>
								<Input placeholder="请输入标签名"
									   onChange={this.updateTagName} value={this.state.tagName}
								/>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<AutoComplete
									allowClear={true}
									dataSource={allTags}
									style={{width: 200, padding: '0px 12px 0px 0px'}}
									onSelect={this.onTagSelect}
									onSearch={this.onTagSearch}
									placeholder="选择上级标签"
								>
									<input onKeyPress={this.onTagEnterPress}/>
								</AutoComplete>
								{tags}
							</Col>
						</Row>

						<Row>
							<Col span={12}>
								<Button type="primary" onClick={this.confirmModify}>更新</Button>
								<Button onClick={this.cancelModify}>取消</Button>
							</Col>
						</Row>

					</Form>
				</Col>
			</Row>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WikiTagEdit));