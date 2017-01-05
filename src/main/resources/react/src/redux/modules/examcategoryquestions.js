const QUERY_EXAM_CATEGORY_QUESTION = 'QUERY_EXAM_CATEGORY_QUESTION';
const QUERY_EXAM_CATEGORY_QUESTION_SUCCESS = 'QUERY_EXAM_CATEGORY_QUESTION_SUCCESS';
const QUERY_EXAM_CATEGORY_QUESTION_FAILED = 'QUERY_EXAM_CATEGORY_QUESTION_FAILED';

const UPDATE_EXAM_QUESTION = 'UPDATE_EXAM_QUESTION';
const UPDATE_EXAM_QUESTION_SUCCESS = 'UPDATE_EXAM_QUESTION_SUCCESS';
const UPDATE_EXAM_QUESTION_FAILED = 'UPDATE_EXAM_QUESTION_FAILED';

const DEL_EXAM_QUESTION = 'DEL_EXAM_QUESTION';
const DEL_EXAM_QUESTION_SUCCESS = 'DEL_EXAM_QUESTION_SUCCESS';
const DEL_EXAM_QUESTION_FAILED = 'DEL_EXAM_QUESTION_FAILED';

const ADD_EXAM_QUESTION = 'ADD_EXAM_QUESTION';
const ADD_EXAM_QUESTION_SUCCESS = 'ADD_EXAM_QUESTION_SUCCESS';
const ADD_EXAM_QUESTION_FAILED = 'ADD_EXAM_QUESTION_FAILED';

// 查询所有的账号
export function queryCategoryQuestions(categoryId) {
  console.info('触发 queryCategoryQuestions');
  return {
    types: [QUERY_EXAM_CATEGORY_QUESTION, QUERY_EXAM_CATEGORY_QUESTION_SUCCESS, QUERY_EXAM_CATEGORY_QUESTION_FAILED],
    promise: (client) => client.get('/api/categoryquestions', {
      params: {
        categoryId: categoryId
      }
    })
  };
}

export function updateQuestion(questionId, data) {
  console.info('触发 updateQuestion');
  return {
    types: [UPDATE_EXAM_QUESTION, UPDATE_EXAM_QUESTION_SUCCESS, UPDATE_EXAM_QUESTION_FAILED],
    promise: (client) => client.put('/api/questions/' + questionId, {
      data: data
    })
  };
}

export function delQuestion(questionId) {
  console.info('触发 delQuestion');
  return {
    types: [DEL_EXAM_QUESTION, DEL_EXAM_QUESTION_SUCCESS, DEL_EXAM_QUESTION_FAILED],
    promise: (client) => client.del('/api/questions/' + questionId, {
      params: {}
    })
  };
}

export function createQuestion(data) {
  console.info('触发 createQuestion');
  return {
    types: [ADD_EXAM_QUESTION, ADD_EXAM_QUESTION_SUCCESS, ADD_EXAM_QUESTION_FAILED],
    promise: (client) => client.post('/api/questions', {
      data: data
    })
  };
}

const initialState = {
  categoryQuestions: [],
  editFinished: false,
  createFinished: false,
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_EXAM_CATEGORY_QUESTION:
      console.info('reducer query exam questions');
      return {
        ...state
      };
    case QUERY_EXAM_CATEGORY_QUESTION_SUCCESS:
      console.info('reducer query exam questions success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }
      return {
        ...state,
        categoryQuestions: action.result.data.questions,
        editFinished: false,
        createFinished: false
      };
    case QUERY_EXAM_CATEGORY_QUESTION_FAILED:
      console.info('reducer query exam questions failed');
      return {
        ...state
      };
    case UPDATE_EXAM_QUESTION:
      console.info('reducer update question');
      return {
        ...state
      };
    case UPDATE_EXAM_QUESTION_SUCCESS:
      console.info('reducer update question success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state,
          editFinished: true
        };
      }
      return {
        ...state,
        editFinished: true
      };
    case UPDATE_EXAM_QUESTION_FAILED:
      console.info('reducer update question failed');
      return {
        ...state
      };
    case DEL_EXAM_QUESTION:
      console.info('reducer del question');
      return {
        ...state
      };
    case DEL_EXAM_QUESTION_SUCCESS:
      console.info('reducer del question success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }
      return {
        ...state
      };
    case DEL_EXAM_QUESTION_FAILED:
      console.info('reducer del question failed');
      return {
        ...state
      };
    case ADD_EXAM_QUESTION:
      console.info('reducer add question');
      return {
        ...state
      };
    case ADD_EXAM_QUESTION_SUCCESS:
      console.info('reducer add question success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state,
          createFinished: true
        };
      }
      return {
        ...state,
        createFinished: true
      };
    case ADD_EXAM_QUESTION_FAILED:
      console.info('reducer add question failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
