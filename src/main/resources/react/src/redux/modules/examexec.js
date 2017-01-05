const CLEAR_LOAD_QUESTIONS_MARK = 'CLEAR_LOAD_QUESTIONS_MARK';

const REMOVE_CHECKED_QUESTION = 'REMOVE_CHECKED_QUESTION';

const PREPARE_QUESTIONS = 'PREPARE_QUESTIONS';
const PREPARE_QUESTIONS_SUCCESS = 'PREPARE_QUESTIONS_SUCCESS';
const PREPARE_QUESTIONS_FAILED = 'PREPARE_QUESTIONS_FAILED';

export function clearLoadMark() {
  console.info('触发 clearLoadMark');
  return {
    type: CLEAR_LOAD_QUESTIONS_MARK
  };
}

// 查询所有的账号
export function prepareQuestion(categoryId) {
  console.info('触发 prepareQuestion');
  return {
    types: [PREPARE_QUESTIONS, PREPARE_QUESTIONS_SUCCESS, PREPARE_QUESTIONS_FAILED],
    promise: (client) => client.get('/api/preparequestions', {
      params: {
        categoryId: categoryId,
        num: 50
      }
    })
  };
}

export function commitAnswer(question) {
  console.info('触发 commitAnswer');
  return {
    type: REMOVE_CHECKED_QUESTION,
    checkedQuestion: question
  };
}

const initialState = {
  questions: [],
  loadFinished: false,
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_LOAD_QUESTIONS_MARK:
      console.info('清空加载的标记');
      return {
        ...state,
        loadFinished: false
      };
    case REMOVE_CHECKED_QUESTION:
      console.info('移除已经检测过的问题');
      const checkedQuestion = action.checkedQuestion;
      const remainingQuestions = [];
      for (const question of state.questions) {
        if (question.questionId === checkedQuestion.questionId) {
          continue;
        }
        remainingQuestions.push(question);
      }
      return {
        ...state,
        questions: remainingQuestions
      };
    case PREPARE_QUESTIONS:
      console.info('reducer prepare questions');
      return {
        ...state
      };
    case PREPARE_QUESTIONS_SUCCESS:
      console.info('reducer prepare questions success');
      console.info(action.result);
      if (action.result.rt !== 0) {
        return {
          ...state
        };
      }

      return {
        ...state,
        questions: action.result.data.questions,
        loadFinished: true
      };
    case PREPARE_QUESTIONS_FAILED:
      console.info('reducer prepare questions failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
