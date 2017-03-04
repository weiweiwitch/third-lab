import * as React from "react";
import {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Row, Col} from 'antd';

interface StateProps {
  children?: any
}

interface DispatchProps {
  pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {};
}

class App extends Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="air">
        <Row>
          <Col span={22}>
            <div>
              <a href="#">AIR</a>
            </div>
          </Col>
          <Col span={2}>
            <ul>
              <li >
                <Link to="/wiki/wikiindex">Wiki</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({}, dispatch)
})(App);