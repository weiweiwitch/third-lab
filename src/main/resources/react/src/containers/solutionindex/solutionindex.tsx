import * as React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

interface StateProps {
  children?: any
}

interface DispatchProps {
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {};
}

class SolutionIndex extends React.Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Solution</div>);
  }
}

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({
  }, dispatch)
})(SolutionIndex);