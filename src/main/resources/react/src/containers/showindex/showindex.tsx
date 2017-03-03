import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";

interface StateProps {
}

interface DispatchProps {
  pushState(nextLocation: any);
}

type AppProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {};
}

class ShowIndex extends React.Component<AppProps, any> {

  constructor(props) {
    super(props);
  }

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

export default connect(mapStateToProps, (dispatch) => {
  return bindActionCreators({
    pushState: push,
  }, dispatch)
})(ShowIndex);
