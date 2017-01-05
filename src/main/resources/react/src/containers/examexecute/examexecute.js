import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {commitAnswer, delQuestion} from '../../redux/modules/examexec';

@connect(
  state => ({
    questions: state.examexec.questions
  }),
  {
    commitAnswer: commitAnswer,
    pushState: push
  }
)
export default class ExamQuestionCheck extends Component {
  static propTypes = {
    params: PropTypes.object,
    questions: PropTypes.array.isRequired,
    commitAnswer: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.showQuestion(props.questions, true);
  }

  componentWillReceiveProps(nextProps) {
    const questions = nextProps.questions;
    const length = questions.length;
    if (length <= 0) {
      // 没题目了,结束了
      this.props.pushState('/exam/examcheckfinish');
      return;
    }

    this.showQuestion(questions, false);
  }

  showQuestion(categoryQuestions, init) {
    // 获取题目
    const length = categoryQuestions.length;
    const index = Math.floor(Math.random() * (length));
    console.info('length:' + length + ', index:' + index);
    const question = categoryQuestions[index];
    const questionId = question.questionId;
    const questionStr = question.question;
    const answerStr = question.answer;
    const answerOther1Str = question.answerOther1;
    const answerOther2Str = question.answerOther2;
    const answerOther3Str = question.answerOther3;

    if (init) {
      this.state = {
        checkQuestion: question,
        questionId: questionId,
        questionStr: questionStr,
        answerStr: answerStr,
        answerOther1Str: answerOther1Str,
        answerOther2Str: answerOther2Str,
        answerOther3Str: answerOther3Str,
        showAnswer: false
      };
    } else {
      this.setState({
        checkQuestion: question,
        questionId: questionId,
        questionStr: questionStr,
        answerStr: answerStr,
        answerOther1Str: answerOther1Str,
        answerOther2Str: answerOther2Str,
        answerOther3Str: answerOther3Str,
        showAnswer: false
      });
    }
  }

  showAnswer() {
    this.setState({
      showAnswer: true
    });
  }

  commitAnswer() {
    this.props.commitAnswer(this.state.checkQuestion);
  }

  render() {
    const questionId = parseInt(this.props.params.questionId, 10);

    let doAction = (
      <RaisedButton label="显示答案" primary={true} onClick={() => {
        this.showAnswer();
      }}/>
    );
    if (this.state.showAnswer) {
      doAction = (
        <RaisedButton label="下一个" primary={true} onClick={() => {
          this.commitAnswer();
        }}/>
      );
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="问题"
                floatingLabelText="问题"
                value={this.state.questionStr} disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {doAction}
            </div>
          </div>
          {
            this.state.showAnswer
              ? (<div className="row">
              <div className="col-md-12">
                <TextField
                  hintText="答案"
                  floatingLabelText="答案"
                  value={this.state.answerStr} disabled={true}
                />
              </div>
            </div>)
              : (<div className="row">
              <div className="col-md-12">
              </div>
            </div>)
          }
        </div>
      </div>
    );
  }
}
