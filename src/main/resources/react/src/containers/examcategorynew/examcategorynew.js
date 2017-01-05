import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import {createCategory, clearCreateCategoryMark} from '../../redux/modules/examcategory';

@connect(
  state => ({
    categories: state.examcategory.categories,
    createFinished: state.examcategory.createFinished
  }),
  {
    createCategory: createCategory,
    clearCreateCategoryMark: clearCreateCategoryMark,
    pushState: push
  }
)
export default class ExamCategoryNew extends Component {
  static propTypes = {
    params: PropTypes.object,
    categories: PropTypes.array.isRequired,
    createCategory: PropTypes.func.isRequired,
    clearCreateCategoryMark: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      categoryId: 0,
      parentId: 0,
      categoryName: ''
    };

  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    if (nextProps.createFinished === true) {
      this.props.pushState('/exam/examsummary');

      this.props.clearCreateCategoryMark();
    }
  }

  updateCategoryName(event) {
    this.setState({categoryName: event.target.value});
  }

  saveCategory() {
    this.props.createCategory({
      categoryId: this.state.categoryId,
      parentId: this.state.parentId,
      categoryName: this.state.categoryName
    });
  }

  // 放弃保存
  cancelEdit() {
    this.props.pushState('/exam/examsummary');
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
                hintText="类别"
                floatingLabelText="类别"
                value={this.state.categoryName}
                onChange={(event)=> {
                  this.updateCategoryName(event);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RaisedButton label="保存" primary={true} onClick={() => {
                this.saveCategory();
              }}/>
              <RaisedButton label="放弃" primary={true} onClick={() => {
                this.cancelEdit();
              }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
