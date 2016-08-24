import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import WikiTree from '../wikitree/wikitree';
import {queryPosts} from '../../redux/modules/wikiposts';

require('./wiki.scss');

@connect(
  state => ({}),
  {
    queryPosts: queryPosts
  }
)
export default class Wiki extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired, // 子组件
    queryPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.queryPosts();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <WikiTree />
        </div>
        <div className="col-md-10">
          {this.props.children}
        </div>
      </div>
    );
  }
}
