import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {queryCategoryQuestions} from '../../redux/modules/examcategoryquestions';

@connect(
  state => ({
    categoryQuestions: state.examcategoryquestions.categoryQuestions
  }),
  {
    queryCategoryQuestions: queryCategoryQuestions,
    pushState: push
  }
)
export default class ExamQuestionList extends Component {
  static propTypes = {
    params: PropTypes.object,
    categoryQuestions: PropTypes.array.isRequired,
    queryCategoryQuestions: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  componentDidMount() {
    // 查询账号列表
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.queryCategoryQuestions(categoryId);
  }

  showQuestion(questionId) {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examquestion/' + categoryId + '/' + questionId);
  }

  createQuestion() {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examquestionnew/' + categoryId);
  }

  startExam() {
    const categoryId = parseInt(this.props.params.categoryId, 10);
    this.props.pushState('/exam/examstart/' + categoryId);
  }

  render() {

    const categoryQuestions = this.props.categoryQuestions;
    const questionList = categoryQuestions.map((question) => {
      return (
        <TableRow key={question.questionId}>
          <TableRowColumn>{question.questionId}</TableRowColumn>
          <TableRowColumn>{question.question}</TableRowColumn>
          <TableRowColumn>{question.proficiency}</TableRowColumn>
          <TableRowColumn><RaisedButton label="查看" primary={true} onClick={() => {
            this.showQuestion(question.questionId);
          }}/></TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <RaisedButton label="创建新题目" primary={true} onClick={() => {
                this.createQuestion();
              }}/>
              <RaisedButton label="开始测试" primary={true} onClick={() => {
                this.startExam();
              }}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>问题</TableHeaderColumn>
                    <TableHeaderColumn>熟练度</TableHeaderColumn>
                    <TableHeaderColumn>操作</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {questionList}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
