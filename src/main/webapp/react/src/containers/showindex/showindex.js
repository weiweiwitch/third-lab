import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

@connect(
  state => ({}),
  {
    pushState: push
  }
)
export default class ShowIndex extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired
  };

  componentDidMount() {
    // 查询账号列表
    this.props.pushState('/wiki/wikiindex');
  }

  render() {
    return (
      <div></div>
    );
  }
}
