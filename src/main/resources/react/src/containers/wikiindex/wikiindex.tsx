import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";

interface StateProps {
	wikiposts: any[],
}

interface DispatchProps {
	pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
	return {
		wikiposts: state.wikiposts.wikiposts
	};
}

class WikiIndex extends React.Component<AppProps, any> {

	constructor(props) {
		super(props);

		this.state = {
			searchSource: []
		};
	}

	handleUpdateInput = (keyword) => {
		console.info('handleUpdateInput ' + keyword);
		const wikiposts = this.props.wikiposts;
		const filterPosts = [];
		this.searchEachNode(keyword, wikiposts, filterPosts);

		this.setState({
			searchSource: filterPosts,
		});
	};

	searchEachNode(keyword, wikiposts, filterPosts) {
		for (const post of wikiposts) {
			if (post.title.includes(keyword)) {
				console.info('filter ' + post.title);
				filterPosts.push({
					text: post.title,
					value: post
				});
			}

			if (post.nodes !== null) {
				this.searchEachNode(keyword, post.nodes, filterPosts);
			}
		}
	}

	showPost = (chosenRequest, index) => {
		console.info(index);
		if (index !== -1) {
			const post = this.state.searchSource[index].value;
			console.info(post);
			this.props.pushState('/wiki/wikipost/' + post.id);
		}
	};

	render() {
		return (
			<div>
			</div>
		);
	}
}

export default connect(mapStateToProps, (dispatch) => {
	return bindActionCreators({
		pushState: push,
	}, dispatch)
})(WikiIndex);