import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import {updateCategory, clearEditCategoryMark} from '../../redux/modules/examcategory';

@connect(
  state => ({
    categories: state.examcategory.categories,
    editFinished: state.examcategory.editFinished
  }),
  {
    updateCategory: updateCategory,
    clearEditCategoryMark: clearEditCategoryMark,
    pushState: push
  }
)
export default class ExamCategoryEdit extends Component {
  static propTypes = {
    params: PropTypes.object,
    categories: PropTypes.array.isRequired,
    updateCategory: PropTypes.func.isRequired,
    clearEditCategoryMark: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const categoryId = parseInt(this.props.params.categoryId, 10);
    const categories = this.props.categories;
    let parentId = 0;
    let categoryName = '';
    for (const category of categories) {
      if (category.id === categoryId) {
        parentId = category.parentCategoryId;
        categoryName = category.category;
      }
    }
    this.state = {
      categoryId: categoryId,
      parentId: parentId,
      categoryName: categoryName
    };

  }

  componentWillReceiveProps(nextProps) {
    // 当将会接收到属性时处理
    if (nextProps.editFinished === true) {
      this.props.pushState('/exam/examsummary');

      this.props.clearEditCategoryMark();
    }
  }

  updateCategoryName(event) {
    this.setState({categoryName: event.target.value});
  }

  saveCategory() {
    this.props.updateCategory(this.state.categoryId, {
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
