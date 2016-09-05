const QUERY_EXAM_CATEGORY_SUMMARY = 'QUERY_EXAM_CATEGORY_SUMMARY';
const QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS = 'QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS';
const QUERY_EXAM_CATEGORY_SUMMARY_FAILED = 'QUERY_EXAM_CATEGORY_SUMMARY_FAILED';

// 查询所有的账号
export function queryCategorySummary() {
  console.info('触发 queryCategorySummary');
  return {
    types: [QUERY_EXAM_CATEGORY_SUMMARY, QUERY_EXAM_CATEGORY_SUMMARY_SUCCESS, QUERY_EXAM_CATEGORY_SUMMARY_FAILED],
    promise: (client) => client.get('/api/categorysummary')
  };
}

const initialState = {
  categories: [],
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
        categories: action.result.data
      };
    case QUERY_EXAM_CATEGORY_SUMMARY_FAILED:
      console.info('reducer query exam summary failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
