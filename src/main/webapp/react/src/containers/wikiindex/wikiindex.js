import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import AutoComplete from 'material-ui/AutoComplete';

@connect(
  state => ({
    wikiposts: state.wikiposts.wikiposts
  }),
  {
    pushState: push
  }
)
export default class WikiIndex extends Component {

  static propTypes = {
    wikiposts: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired
  };

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
        <AutoComplete hintText="Type anything"
                      dataSource={this.state.searchSource}
                      onUpdateInput={this.handleUpdateInput}
                      onNewRequest={this.showPost}
                      floatingLabelText="搜索"
                      fullWidth={true}
        />
      </div>
    );
  }
}
