import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import {queryCategoryQuestions, updateQuestion} from '../../redux/modules/examcategoryquestions';

@connect(
  state => ({
    categoryQuestions: state.examcategoryquestions.categoryQuestions,
    editFinished: state.examcategoryquestions.editFinished
  }),
  {
    queryCategoryQuestions: queryCategoryQuestions,
    updateQuestion: updateQuestion,
    pushState: push
  }
)
export default class ExamQuestionEdit extends Component {
  static propTypes = {
    params: PropTypes.object,
    categoryQuestions: PropTypes.array.isRequired,
    queryCategoryQuestions: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const questionId = parseInt(this.props.params.questionId, 10);
    const categoryQuestions = this.props.categoryQuestions;
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

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    const categoryId = parseInt(this.props.params.categoryId, 10);
    const questionId = parseInt(this.props.params.questionId, 10);
    if (nextProps.editFinished === true) {
      this.props.pushState('/exam/examquestion/' + categoryId + '/' + questionId);

      this.props.queryCategoryQuestions(categoryId);
    }
  }

  updateQuestion(event) {
    this.setState({questionStr: event.target.value});
  }

  updateAnswer(event) {
    this.setState({answerStr: event.target.value});
  }

  updateAnswerOther1(event) {
    this.setState({answerOther1Str: event.target.value});
  }

  updateAnswerOther2(event) {
    this.setState({answerOther2Str: event.target.value});
  }

  updateAnswerOther3(event) {
    this.setState({answerOther3Str: event.target.value});
  }

  saveQuestion() {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    const questionId = parseInt(this.props.params.questionId, 10);
    this.props.updateQuestion(questionId, {
      question: this.state.questionStr,
      answer: this.state.answerStr,
      answerOther1: this.state.answerOther1Str,
      answerOther2: this.state.answerOther2Str,
      answerOther3: this.state.answerOther3Str,
      categoryId: categoryId
    });
  }

  // 放弃保存
  cancelEdit(questionId) {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examquestion/' + categoryId + '/' + questionId);
  }

  render() {
    const questionId = parseInt(this.props.params.questionId, 10);

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarTitle text="编辑"/>
                </ToolbarGroup>
              </Toolbar>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="问题"
                floatingLabelText="问题"
                value={this.state.questionStr}
                onChange={(event)=> {
                  this.updateQuestion(event);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="答案"
                floatingLabelText="答案"
                value={this.state.answerStr}
                onChange={(event)=> {
                  this.updateAnswer(event);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="迷惑答案1"
                floatingLabelText="迷惑答案1"
                value={this.state.answerOther1Str}
                onChange={(event)=> {
                  this.updateAnswerOther1(event);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="迷惑答案2"
                floatingLabelText="迷惑答案2"
                value={this.state.answerOther2Str}
                onChange={(event)=> {
                  this.updateAnswerOther2(event);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                hintText="迷惑答案3"
                floatingLabelText="迷惑答案3"
                value={this.state.answerOther3Str}
                onChange={(event)=> {
                  this.updateAnswerOther3(event);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RaisedButton label="保存" primary={true} onClick={() => {
                this.saveQuestion(questionId);
              }}/>
              <RaisedButton label="放弃" primary={true} onClick={() => {
                this.cancelEdit(questionId);
              }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
