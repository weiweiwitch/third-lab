import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {queryCategoryQuestions, delQuestion} from '../../redux/modules/examcategoryquestions';

@connect(
  state => ({
    categoryQuestions: state.examcategoryquestions.categoryQuestions
  }),
  {
    queryCategoryQuestions: queryCategoryQuestions,
    delQuestion: delQuestion,
    pushState: push
  }
)
export default class ExamQuestion extends Component {
  static propTypes = {
    params: PropTypes.object,
    categoryQuestions: PropTypes.array.isRequired,
    delQuestion: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const questionId = parseInt(this.props.params.questionId, 10);
    const categoryQuestions = this.props.categoryQuestions;
    this.syncQuestion(questionId, categoryQuestions);
  }

  componentWillReceiveProps(nextProps) {
    console.info('ExamQuestion componentWillReceiveProps');
    const questionId = parseInt(this.props.params.questionId, 10);
    const categoryQuestions = nextProps.categoryQuestions;
    this.syncQuestion(questionId, categoryQuestions);
  }

  syncQuestion(questionId, categoryQuestions) {
    let questionStr = '';
    let answerStr = '';
    let answerOther1Str = '';
    let answerOther2Str = '';
    let answerOther3Str = '';
    for (const question of categoryQuestions) {
      if (question.questionId === questionId) {
        questionStr = question.question;
        answerStr = question.answer;
        answerOther1Str = question.answerOther1;
        answerOther2Str = question.answerOther2;
        answerOther3Str = question.answerOther3;
      }
    }
    this.state = {
      questionStr: questionStr,
      answerStr: answerStr,
      answerOther1Str: answerOther1Str,
      answerOther2Str: answerOther2Str,
      answerOther3Str: answerOther3Str
    };
  }

  editQuestion(questionId) {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examquestionedit/' + categoryId + '/' + questionId);
  }

  delQuestion(questionId) {
    // 删除问题
    this.props.delQuestion(questionId);

    // 切换到问题列表界面
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examquestionlist/' + categoryId);
  }

  render() {
    const questionId = parseInt(this.props.params.questionId, 10);

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
              <TextField
                hintText="答案"
                floatingLabelText="答案"
                value={this.state.answerStr} disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="迷惑答案1"
                floatingLabelText="迷惑答案1"
                value={this.state.answerOther1Str} disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="迷惑答案2"
                floatingLabelText="迷惑答案2"
                value={this.state.answerOther2Str} disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="迷惑答案3"
                floatingLabelText="迷惑答案3"
                value={this.state.answerOther3Str} disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RaisedButton label="编辑" primary={true} onClick={() => {
                this.editQuestion(questionId);
              }}/>
              <RaisedButton label="删除" primary={true} onClick={() => {
                this.delQuestion(questionId);
              }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
