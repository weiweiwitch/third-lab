import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Row, Col, Radio} from "antd";
import {Layout} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
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
      <div>
        <Layout>
          <Header id="header">
            <Row>
              <Col span={20}>
                <div id="logo">
                  <span href="#">third lab</span>
                </div>
              </Col>
              <Col span={4}>
                <RadioGroup onChange={this.onChange} defaultValue="/wiki/wikiindex">
                  <RadioButton value="/wiki/wikiindex">Wiki</RadioButton>
                  <RadioButton value="/solution/solutionindex">解决方案</RadioButton>
                </RadioGroup>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: '0 30px' }}>
            {this.props.children}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({
    pushState: push
  }, dispatch)
})(App);