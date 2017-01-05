import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import {queryCategoryQuestions, createQuestion} from '../../redux/modules/examcategoryquestions';

@connect(
  state => ({
    categoryQuestions: state.examcategoryquestions.categoryQuestions,
    createFinished: state.examcategoryquestions.createFinished
  }),
  {
    queryCategoryQuestions: queryCategoryQuestions,
    createQuestion: createQuestion,
    pushState: push
  }
)
export default class ExamQuestionCreate extends Component {
  static propTypes = {
    params: PropTypes.object,
    categoryQuestions: PropTypes.array.isRequired,
    queryCategoryQuestions: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const questionStr = '';
    const answerStr = '';
    const answerOther1Str = '';
    const answerOther2Str = '';
    const answerOther3Str = '';
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
    if (nextProps.createFinished === true) {
      this.props.pushState('/exam/examquestionlist/' + categoryId);

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
    this.props.createQuestion({
      question: this.state.questionStr,
      answer: this.state.answerStr,
      answerOther1: this.state.answerOther1Str,
      answerOther2: this.state.answerOther2Str,
      answerOther3: this.state.answerOther3Str,
      categoryId: categoryId
    });
  }

  // 放弃创建
  cancelCreate() {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examquestionlist/' + categoryId);
  }

  render() {
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
                this.saveQuestion();
              }}/>
              <RaisedButton label="放弃" primary={true} onClick={() => {
                this.cancelCreate();
              }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
