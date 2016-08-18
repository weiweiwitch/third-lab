import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({}),
  {}
)
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired // 子组件
  };

  render() {
    return (
      <div className="container-fluid air">
        <div className="row air-nav">
          <div className="col-md-12">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">AIR</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li >
                <a href="#">Wiki</a>
              </li>
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
