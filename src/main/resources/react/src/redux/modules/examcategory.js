const CLEAR_EDIT_CATEGORY_MARK = 'CLEAR_EDIT_CATEGORY_MARK';
const CLEAR_CREATE_CATEGORY_MARK = 'CLEAR_CREATE_CATEGORY_MARK';

const QUERY_EXAM_CATEGORY_SUMMARY = 'QUERY_EXAM_CATEGORY_SUMMARY';
const QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS = 'QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS';
const QUERY_EXAM_CATEGORY_SUMMARY_FAILED = 'QUERY_EXAM_CATEGORY_SUMMARY_FAILED';

const UPDATE_EXAM_CATEGORY = 'UPDATE_EXAM_CATEGORY';
const UPDATE_EXAM_CATEGORY_SUCCESS = 'UPDATE_EXAM_CATEGORY_SUCCESS';
const UPDATE_EXAM_CATEGORY_FAILED = 'UPDATE_EXAM_CATEGORY_FAILED';

const CREATE_EXAM_CATEGORY = 'CREATE_EXAM_CATEGORY';
const CREATE_EXAM_CATEGORY_SUCCESS = 'CREATE_EXAM_CATEGORY_SUCCESS';
const CREATE_EXAM_CATEGORY_FAILED = 'CREATE_EXAM_CATEGORY_FAILED';

const DEL_EXAM_CATEGORY = 'DEL_EXAM_CATEGORY';
const DEL_EXAM_CATEGORY_SUCCESS = 'DEL_EXAM_CATEGORY_SUCCESS';
const DEL_EXAM_CATEGORY_FAILED = 'DEL_EXAM_CATEGORY_FAILED';

export function clearEditCategoryMark() {
  console.info('触发 clearEditCategoryMark');
  return {
    type: CLEAR_EDIT_CATEGORY_MARK
  };
}

export function clearCreateCategoryMark() {
  console.info('触发 clearCreateCategoryMark');
  return {
    type: CLEAR_CREATE_CATEGORY_MARK
  };
}

export function delCategory(categoryId) {
  console.info('触发 delCategory');
  return {
    types: [DEL_EXAM_CATEGORY, DEL_EXAM_CATEGORY_SUCCESS, DEL_EXAM_CATEGORY_FAILED],
    promise: (client) => client.del('/api/categories/' + categoryId, {
      params: {}
    })
  };
}

// 查询所有的账号
export function queryCategorySummary() {
  console.info('触发 queryCategorySummary');
  return {
    types: [QUERY_EXAM_CATEGORY_SUMMARY, QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS, QUERY_EXAM_CATEGORY_SUMMARY_FAILED],
    promise: (client) => client.get('/api/categorysummary')
  };
}

export function updateCategory(categoryId, data) {
  console.info('触发 updateCategory');
  return {
    types: [UPDATE_EXAM_CATEGORY, UPDATE_EXAM_CATEGORY_SUCCESS, UPDATE_EXAM_CATEGORY_FAILED],
    promise: (client) => client.put('/api/categories/' + categoryId, {
      data: data
    })
  };
}

export function createCategory(data) {
  console.info('触发 updateCategory');
  return {
    types: [CREATE_EXAM_CATEGORY, CREATE_EXAM_CATEGORY_SUCCESS, CREATE_EXAM_CATEGORY_FAILED],
    promise: (client) => client.post('/api/categories', {
      data: data
    })
  };
}

const initialState = {
  categories: [],
  editFinished: false,
  createFinished: false,
  deleteFinished: false,
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_EDIT_CATEGORY_MARK:
      console.info('清空编辑类别的标记');
      return {
        ...state,
        editFinished: false
      };
    case CLEAR_CREATE_CATEGORY_MARK:
      console.info('清空编辑类别的标记');
      return {
        ...state,
        createFinished: false
      };
    case QUERY_EXAM_CATEGORY_SUMMARY:
      console.info('reducer query exam summary');
      return {
        ...state
      };
    case QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS:
      console.info('reducer query exam summary success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }

      return {
        ...state,
        categories: action.result.data,
        deleteFinished: false
      };
    case QUERY_EXAM_CATEGORY_SUMMARY_FAILED:
      console.info('reducer query exam summary failed');
      return {
        ...state
      };
    case UPDATE_EXAM_CATEGORY:
      console.info('reducer update category');
      return {
        ...state
      };
    case UPDATE_EXAM_CATEGORY_SUCCESS:
      console.info('reducer update category success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }

      return {
        ...state,
        editFinished: true
      };
    case UPDATE_EXAM_CATEGORY_FAILED:
      console.info('reducer update category failed');
      return {
        ...state
      };
    case CREATE_EXAM_CATEGORY:
      console.info('reducer update category');
      return {
        ...state
      };
    case CREATE_EXAM_CATEGORY_SUCCESS:
      console.info('reducer update category success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }

      return {
        ...state,
        createFinished: true
      };
    case CREATE_EXAM_CATEGORY_FAILED:
      console.info('reducer update category failed');
      return {
        ...state
      };
    case DEL_EXAM_CATEGORY:
      console.info('reducer del category');
      return {
        ...state
      };
    case DEL_EXAM_CATEGORY_SUCCESS:
      console.info('reducer del category success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }

      return {
        ...state,
        deleteFinished: true
      };
    case DEL_EXAM_CATEGORY_FAILED:
      console.info('reducer del category failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
