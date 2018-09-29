import * as React from "react";
import {connect} from "react-redux";
import {History} from 'history';
import {AutoComplete, Button, Col, Form, Row, Tag} from "antd";
import {bindActionCreators} from "redux";
import {move2NewTag} from "../../sagas/posts";
import {WikiTagData, WikiTagsState} from "../../redux/modules/wikitags";
import {SpecPostData, WikiSpecPostState} from "../../redux/modules/wikispecpost";

interface IStateProps {
	history: History;
	wikipost: SpecPostData;
	wikitaglist: WikiTagData[];
}

interface IDispatchProps {
	move2NewTag(postId: number, oldTagId: number, tagId: number);
}

type IAppProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: any) => {
	const wikispecpost: WikiSpecPostState = state.wikispecpost;
	const wikitags: WikiTagsState = state.wikitags;

	return {
		wikipost: wikispecpost.wikipost,
		wikitaglist: wikitags.wikitaglist,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators({
		move2NewTag,
	}, dispatch);
};

interface IState {
	postTag: WikiTagData;
	showedParentTag: any[];
	tagSearchResult: any[];
	selectedTag: string;
	inputTag: string;
}

class WikiPostMove2NewTag extends React.Component<IAppProps, IState> {

	constructor(props: IAppProps) {
		super(props);

		let postTag = new WikiTagData();
		const postTagId = this.props.wikipost.tagId;
		props.wikitaglist.map((tag: any) => {
			if (tag.id === postTagId) {
				postTag = tag;
			}
		});

		this.state = {
			postTag,
			showedParentTag: [],
			tagSearchResult: [],
			selectedTag: '',
			inputTag: '',
		};
	}

	confirmModify = (event: any) => {
		event.preventDefault();

		const postId = this.props.wikipost.id;
		const oldTagId = this.props.wikipost.tagId;
		this.props.move2NewTag(postId, oldTagId, this.state.postTag.id);
	};

	cancelModify = (event: any) => {
		event.preventDefault();

		this.props.history.push('/wiki/wikiindex');
	};

	onTagSelect = (value: any) => {
		this.setState({
			selectedTag: value,
		});
	};

	onTagSearch = (inputValue: any) => {
		const searchResult = [];
		const existTagMap = new Map<string, boolean>();
		this.state.showedParentTag.map((postTag: any) => {
			existTagMap[postTag.tagName] = true;
		});
		this.props.wikitaglist.filter((tag: WikiTagData) => {
			if (tag.nodes.length > 0) {
				// 过滤掉不是叶子标签的
				return false;
			}
			if (existTagMap[tag.tagName] !== null && existTagMap[tag.tagName] !== undefined) {
				// 过滤掉已经添加给目标的标签
				return false;
			}
			if (tag.tagName.indexOf(inputValue) === -1) {
				// 过滤掉总标签表中和当前输入不符的。
				return false;
			}

			searchResult.push(tag.tagName);
			return true;
		});

		this.setState({
			tagSearchResult: searchResult,
			inputTag: inputValue,
		});
	};

	onTagEnterPress = (event: any) => {
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
				if (existTagMap[selectedTagName] !== null && existTagMap[selectedTagName] !== undefined) {
					// 已经存在了
					return;
				}

				this.props.wikitaglist.map((tag: any) => {
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
				postTag: newParentTag,
				showedParentTag: [newParentTag],
				selectedTag: '', // 清空选择
				inputTag: '',
			});
		}
	};

	tagClose = (tag: any) => {
		const remainings = this.state.showedParentTag.filter((record: any, index: any) => {
			return record === tag ? false : true;
		});
		if (remainings.length > 0) {
			return;
		}

		this.setState({
			postTag: new WikiTagData(),
			showedParentTag: [],
		});
	};

	render() {
		const tags = this.state.showedParentTag.map((tag: any) => {
			return (
				<Tag key={tag.id} closable afterClose={() => this.tagClose(tag)}>{tag.tagName}</Tag>
			);
		});

		const allTags = this.state.tagSearchResult;

		return (
			<Row>
				<Col span={24}>
					<Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WikiPostMove2NewTag);