import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {delCategory, queryCategorySummary} from '../../redux/modules/examcategory';

@connect(
  state => ({
    categories: state.examcategory.categories,
    deleteFinished: state.examcategory.deleteFinished
  }),
  {
    delCategory: delCategory,
    queryCategorySummary: queryCategorySummary,
    pushState: push
  }
)
export default class ExamSummary extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    delCategory: PropTypes.func.isRequired,
    queryCategorySummary: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.queryCategorySummary();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteFinished === true) {
      this.props.queryCategorySummary();
    }
  }

  addNewCategory() {
    this.props.pushState('/exam/examcategorynew');
  }

  showQuestions = (categoryId) => {
    this.props.pushState('/exam/examquestionlist/' + categoryId);
  };

  editCategory = (categoryId) => {
    this.props.pushState('/exam/examcategoryedit/' + categoryId);
  };

  delCategory(categoryId) {
    this.props.delCategory(categoryId);
  }

  render() {
    const categories = this.props.categories;
    const categoryList = categories.map((category) => {
      return (
        <TableRow key={category.id}>
          <TableRowColumn>{category.id}</TableRowColumn>
          <TableRowColumn>{category.category}</TableRowColumn>
          <TableRowColumn>{category.questionNum}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="查看" primary={true} onClick={() => {
              this.showQuestions(category.id);
            }}/>
            <RaisedButton label="编辑" primary={true} onClick={() => {
              this.editCategory(category.id);
            }}/>
            <RaisedButton label="删除" onClick={() => {
              this.delCategory(category.id);
            }}/>
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <RaisedButton label="添加新类别" primary={true} onClick={() => {
                this.addNewCategory();
              }}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table>
                <TableHeader adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>类别</TableHeaderColumn>
                    <TableHeaderColumn>数量</TableHeaderColumn>
                    <TableHeaderColumn>操作</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {categoryList}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
