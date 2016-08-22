import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({}),
  {}
)
export default class WikiPost extends Component {

  static propTypes = {
  };

  render() {
    return (
      <div>WikiPost</div>
    );
  }
}
