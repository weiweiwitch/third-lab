import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

@connect(
  state => ({}),
  {
    pushState: push
  }
)
export default class Exam extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired, // 子组件
    pushState: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.props.children}
        </div>
      </div>
    );
  }
}
