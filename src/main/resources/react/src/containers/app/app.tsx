import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Row, Col, Radio} from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

class App extends React.Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    const path = e.target.value;

    this.props.pushState(path);
  };

  render() {
    return (
      <div className="air">
        <Row>
          <Col span={22}>
            <div id="logo">
              <span href="#">third lab</span>
            </div>
          </Col>
          <Col span={2}>
            <RadioGroup onChange={this.onChange} defaultValue="/wiki/wikiindex">
              <RadioButton value="/wiki/wikiindex">Wiki</RadioButton>
              <RadioButton value="/solution/solutionindex">解决方案</RadioButton>
            </RadioGroup>
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
  return bindActionCreators({
    pushState: push
  }, dispatch)
})(App);