const CLEAR_CREATE_MARK = 'CLEAR_CREATE_MARK';

const QUERY_WIKI_POSTS = 'QUERY_WIKI_POSTS';
const QUERY_WIKI_POSTS_SUCCESS = 'QUERY_WIKI_POSTS_SUCCESS';
const QUERY_WIKI_POSTS_FAILED = 'QUERY_WIKI_POSTS_FAILED';

const ADD_WIKI_SPECPOST = 'ADD_WIKI_SPECPOST';
const ADD_WIKI_SPECPOST_SUCCESS = 'ADD_WIKI_SPECPOST_SUCCESS';
const ADD_WIKI_SPECPOST_FAILED = 'ADD_WIKI_SPECPOST_FAILED';

const DEL_WIKI_SPECPOST = 'DEL_WIKI_SPECPOST';
const DEL_WIKI_SPECPOST_SUCCESS = 'DEL_WIKI_SPECPOST_SUCCESS';
const DEL_WIKI_SPECPOST_FAILED = 'DEL_WIKI_SPECPOST_FAILED';

export function clearCreateMark() {
  console.info('触发 clearCreateMark');
  return {
    type: CLEAR_CREATE_MARK
  };
}

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
    types: [ADD_WIKI_SPECPOST, ADD_WIKI_SPECPOST_SUCCESS, ADD_WIKI_SPECPOST_FAILED],
    promise: (client) => client.post('/api/posts', {
      data: data
    })
  };
}

export function deletePost(id) {
  console.info('触发 deletePost');
  return {
    types: [DEL_WIKI_SPECPOST, DEL_WIKI_SPECPOST_SUCCESS, DEL_WIKI_SPECPOST_FAILED],
    promise: (client) => client.del('/api/posts/' + id, {
      params: {
      }
    })
  };
}

const initialState = {
  wikiposts: [],
  createSuccess: false,
  dirty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_CREATE_MARK:
      console.info('清空创建成功的标记');
      return {
        ...state,
        createSuccess: false
      };
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
    case ADD_WIKI_SPECPOST:
      console.info('reducer add spec post');
      return {
        ...state
      };
    case ADD_WIKI_SPECPOST_SUCCESS:
      console.info('reducer add spec post success');
      console.info(action.result);
      return {
        ...state,
        createSuccess: true,
        dirty: true
      };
    case ADD_WIKI_SPECPOST_FAILED:
      console.info('reducer add spec post failed');
      return {
        ...state
      };
    case DEL_WIKI_SPECPOST:
      console.info('reducer del spec post');
      return {
        ...state
      };
    case DEL_WIKI_SPECPOST_SUCCESS:
      console.info('reducer del spec post success');
      console.info(action.result);
      return {
        ...state,
        dirty: true
      };
    case DEL_WIKI_SPECPOST_FAILED:
      console.info('reducer del spec post failed');
      return {
        ...state
      };
    default:
      return state;
  }
}
