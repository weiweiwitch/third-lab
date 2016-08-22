const QUERY_WIKI_POSTS = 'QUERY_WIKI_POSTS';
const QUERY_WIKI_POSTS_SUCCESS = 'QUERY_WIKI_POSTS_SUCCESS';
const QUERY_WIKI_POSTS_FAILED = 'QUERY_WIKI_POSTS_FAILED';

const ADD_WIKI_POST = 'ADD_WIKI_POST';
const ADD_WIKI_POST_SUCCESS = 'ADD_WIKI_POST_SUCCESS';
const ADD_WIKI_POST_FAILED = 'ADD_WIKI_POST_FAILED';

const CHG_WIKI_POST = 'CHG_WIKI_POST';
const CHG_WIKI_POST_SUCCESS = 'CHG_WIKI_POST_SUCCESS';
const CHG_WIKI_POST_FAILED = 'CHG_WIKI_POST_FAILED';

const DEL_WIKI_POST = 'DEL_WIKI_POST';
const DEL_WIKI_POST_SUCCESS = 'DEL_WIKI_POST_SUCCESS';
const DEL_WIKI_POST_FAILED = 'DEL_WIKI_POST_FAILED';

// 查询所有的账号
export function queryPosts() {
  console.info('触发 queryPosts');
  return {
    types: [QUERY_WIKI_POSTS, QUERY_WIKI_POSTS_SUCCESS, QUERY_WIKI_POSTS_FAILED],
    promise: (client) => client.get('/api/posts')
  };
}

export function addPost(data) {
  console.info('触发 addPost');
  data.state = parseInt(data.state, 10);

  return {
    types: [ADD_WIKI_POST, ADD_WIKI_POST_SUCCESS, ADD_WIKI_POST_FAILED],
    promise: (client) => client.post('/v1/createAccount', {
      data: data
    })
  };
}

export function chgPost(data) {
  console.info('触发 chgPost');
  data.state = parseInt(data.state, 10);

  return {
    types: [CHG_WIKI_POST, CHG_WIKI_POST_SUCCESS, CHG_WIKI_POST_FAILED],
    promise: (client) => client.post('/v1/modifyAccount', {
      data: data
    })
  };
}

export function deletePost(id) {
  console.info('触发 deletePost');
  return {
    types: [DEL_WIKI_POST, DEL_WIKI_POST_SUCCESS, DEL_WIKI_POST_FAILED],
    promise: (client) => client.get('/v1/delAccount', {
      params: {
        accountId: id
      }
    })
  };
}

const initialState = {
  wikiposts: [],
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_WIKI_POSTS:
      console.info('reducer query posts');
      return {
        ...state
      };
    case QUERY_WIKI_POSTS_SUCCESS:
      console.info('reducer query posts success');
      console.info(action.result);

      return {
        ...state,
        wikiposts: action.result,
        dirty: false
      };
    case QUERY_WIKI_POSTS_FAILED:
      console.info('reducer query posts failed');
      return {
        ...state
      };
    case ADD_WIKI_POST:
      console.info('reducer add post');
      return {
        ...state
      };
    case ADD_WIKI_POST_SUCCESS:
      console.info('reducer add post success');
      console.info(action.result);
      if (action.result.rt !== 1) {
        // 添加失败
        return {
          ...state
        };
      }
      return {
        ...state,
        dirty: true
      };
    case ADD_WIKI_POST_FAILED:
      console.info('reducer add post failed');
      return {
        ...state
      };
    case CHG_WIKI_POST:
      console.info('reducer chg post');
      return {
        ...state
      };
    case CHG_WIKI_POST_SUCCESS:
      console.info('reducer chg post success');
      console.info(action.result);
      if (action.result.rt !== 1) {
        // 修改失败
        return {
          ...state
        };
      }
      return {
        ...state,
        dirty: true
      };
    case CHG_WIKI_POST_FAILED:
      console.info('reducer chg post failed');
      return {
        ...state
      };
    case DEL_WIKI_POST:
      console.info('reducer del post');
      return {
        ...state
      };
    case DEL_WIKI_POST_SUCCESS:
      console.info('reducer del post success');
      console.info(action.result);
      if (action.result.rt !== 1) {
        // 删除失败
        return {
          ...state
        };
      }
      return {
        ...state,
        dirty: true
      };
    case DEL_WIKI_POST_FAILED:
      console.info('reducer del post failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
