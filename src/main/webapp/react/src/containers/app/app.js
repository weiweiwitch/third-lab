import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

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
                <Link to="/wiki/wikiindex">Wiki</Link>
              </li>
              <li >
                <Link to="/exam/examsummary">Exam</Link>
              </li>
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
