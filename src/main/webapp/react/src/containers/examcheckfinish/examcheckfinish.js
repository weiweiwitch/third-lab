import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';

import {clearLoadMark, prepareQuestion} from '../../redux/modules/examexec';

@connect(
  state => ({
    questions: state.examexec.questions
  }),
  {
    clearLoadMark: clearLoadMark,
    prepareQuestion: prepareQuestion,
    pushState: push
  }
)
export default class ExamCheckFinish extends Component {
  static propTypes = {
    params: PropTypes.object,
    questions: PropTypes.array.isRequired,
    clearLoadMark: PropTypes.func.isRequired,
    prepareQuestion: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  finished() {
    this.props.pushState('/exam/examsummary');
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <RaisedButton label="结束" primary={true} onClick={() => {
            this.finished();
          }}/>
        </div>
      </div>
    );
  }
}
