import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';

import {clearLoadMark, prepareQuestion} from '../../redux/modules/examexec';

@connect(
  state => ({
    questions: state.examexec.questions,
    loadFinished: state.examexec.loadFinished
  }),
  {
    clearLoadMark: clearLoadMark,
    prepareQuestion: prepareQuestion,
    pushState: push
  }
)
export default class ExamStart extends Component {
  static propTypes = {
    params: PropTypes.object,
    questions: PropTypes.array.isRequired,
    clearLoadMark: PropTypes.func.isRequired,
    prepareQuestion: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      startDisable: true
    };
  }

  componentDidMount() {
    // 清空加载标记
    this.props.clearLoadMark();

    // 准备题目
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.prepareQuestion(categoryId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadFinished === true) {
      this.setState({
        startDisable: false
      });
    }
  }

  startExam() {
    this.props.pushState('/exam/examexec');
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <RaisedButton label="开始" primary={true} disabled={this.state.startDisable} onClick={() => {
            this.startExam();
          }}/>
        </div>
      </div>
    );
  }
}
