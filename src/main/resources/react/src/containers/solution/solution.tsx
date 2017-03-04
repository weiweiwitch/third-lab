import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Row, Col} from "antd";

interface StateProps {
  children?: any
}

interface DispatchProps {
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {};
}

class Solution extends React.Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({}, dispatch)
})(Solution);