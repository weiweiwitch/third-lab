const CLEAR_MODIFY_MARK = 'CLEAR_MODIFY_MARK';

const QUERY_WIKI_SPECPOST = 'QUERY_WIKI_SPECPOST';
const QUERY_WIKI_SPECPOST_SUCCESS = 'QUERY_WIKI_SPECPOST_SUCCESS';
const QUERY_WIKI_SPECPOST_FAILED = 'QUERY_WIKI_SPECPOST_FAILED';

const CHG_WIKI_SPECPOST = 'CHG_WIKI_SPECPOST';
const CHG_WIKI_SPECPOST_SUCCESS = 'CHG_WIKI_SPECPOST_SUCCESS';
const CHG_WIKI_SPECPOST_FAILED = 'CHG_WIKI_SPECPOST_FAILED';

export function clearModifyMark() {
  console.info('触发 clearModifyMark');
  return {
    type: CLEAR_MODIFY_MARK
  };
}

// 查询特定文章
export function querySpecPost(postId) {
  console.info('触发 querySpecPost');
  return {
    types: [QUERY_WIKI_SPECPOST, QUERY_WIKI_SPECPOST_SUCCESS, QUERY_WIKI_SPECPOST_FAILED],
    promise: (client) => client.get('/api//posts/' + postId)
  };
}

export function chgPost(id, data) {
  console.info('触发 chgPost');
  data.state = parseInt(data.state, 10);

  return {
    types: [CHG_WIKI_SPECPOST, CHG_WIKI_SPECPOST_SUCCESS, CHG_WIKI_SPECPOST_FAILED],
    promise: (client) => client.put('/api/posts/' + id, {
      data: data
    })
  };
}

const initialState = {
  wikipost: {
    postText: ''
  },
  modifySuccess: false,
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_MODIFY_MARK:
      return {
        ...state,
        modifySuccess: false
      };
    case QUERY_WIKI_SPECPOST:
      console.info('reducer query spec post');
      return {
        ...state
      };
    case QUERY_WIKI_SPECPOST_SUCCESS:
      console.info('reducer query spec post success');
      console.info(action.result);

      return {
        ...state,
        wikipost: action.result,
        dirty: false
      };
    case QUERY_WIKI_SPECPOST_FAILED:
      console.info('reducer query spec post failed');
      return {
        ...state
      };
    case CHG_WIKI_SPECPOST:
      console.info('reducer chg spec post');
      return {
        ...state
      };
    case CHG_WIKI_SPECPOST_SUCCESS:
      console.info('reducer chg spec post success');
      console.info(action.result);
      return {
        ...state,
        modifySuccess: true,
        dirty: true
      };
    case CHG_WIKI_SPECPOST_FAILED:
      console.info('reducer chg spec post failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
