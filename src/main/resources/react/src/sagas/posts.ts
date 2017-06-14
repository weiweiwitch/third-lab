import {all, call, put, takeEvery} from "redux-saga/effects";

import {client} from "../client";

export const CLEAR_CREATE_MARK = 'CLEAR_CREATE_MARK';

export const QUERY_WIKI_POSTS = 'QUERY_WIKI_POSTS';
export const QUERY_WIKI_POSTS_SUCCESS = 'QUERY_WIKI_POSTS_SUCCESS';
export const QUERY_WIKI_POSTS_FAILED = 'QUERY_WIKI_POSTS_FAILED';

export const ADD_WIKI_SPECPOST = 'ADD_WIKI_SPECPOST';
export const ADD_WIKI_SPECPOST_SUCCESS = 'ADD_WIKI_SPECPOST_SUCCESS';
export const ADD_WIKI_SPECPOST_FAILED = 'ADD_WIKI_SPECPOST_FAILED';

export const DEL_WIKI_SPECPOST = 'DEL_WIKI_SPECPOST';
export const DEL_WIKI_SPECPOST_SUCCESS = 'DEL_WIKI_SPECPOST_SUCCESS';
export const DEL_WIKI_SPECPOST_FAILED = 'DEL_WIKI_SPECPOST_FAILED';

export const CLEAR_MODIFY_MARK = 'CLEAR_MODIFY_MARK';

export const QUERY_WIKI_SPECPOST = 'QUERY_WIKI_SPECPOST';
export const QUERY_WIKI_SPECPOST_SUCCESS = 'QUERY_WIKI_SPECPOST_SUCCESS';
export const QUERY_WIKI_SPECPOST_FAILED = 'QUERY_WIKI_SPECPOST_FAILED';

export const CHG_WIKI_SPECPOST = 'CHG_WIKI_SPECPOST';
export const CHG_WIKI_SPECPOST_SUCCESS = 'CHG_WIKI_SPECPOST_SUCCESS';
export const CHG_WIKI_SPECPOST_FAILED = 'CHG_WIKI_SPECPOST_FAILED';

export function clearCreateMark(data) {
	return {
		type: CLEAR_CREATE_MARK,
	};
}

export function queryPosts(data) {
	return {
		type: QUERY_WIKI_POSTS,
		payload: data,
	};
}

function* queryPostsDeal(action) {
	console.info('queryPostsDeal');
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/posts')
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_WIKI_POSTS_FAILED,});
		} else {
			yield put({type: QUERY_WIKI_POSTS_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: QUERY_WIKI_POSTS_FAILED,});
	}
}

export function addPost(data) {
	data.state = parseInt(data.state, 10);

	return {
		type: ADD_WIKI_SPECPOST,
		payload: data,
	};
}

function* addPostDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/posts', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_WIKI_SPECPOST_FAILED,});
		} else {
			yield put({type: ADD_WIKI_SPECPOST_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: ADD_WIKI_SPECPOST_FAILED,});
	}
}

export function deletePost(id: number) {
	return {
		type: DEL_WIKI_SPECPOST,
		payload: {
			id: id,
		}
	};
}

function* deletePostDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/posts/' + action.payload.id, {
				params: {}
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_WIKI_SPECPOST_FAILED,});
		} else {
			yield put({type: DEL_WIKI_SPECPOST_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: DEL_WIKI_SPECPOST_FAILED,});
	}
}

export function clearModifyMark() {
	console.info('触发 clearModifyMark');
	return {
		type: CLEAR_MODIFY_MARK
	};
}

export function querySpecPost(postId) {
	console.info('触发 querySpecPost');
	return {
		type: QUERY_WIKI_SPECPOST,
		payload: {
			id: postId,
		}
	};
}

function* querySpecPostDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/posts/' + action.payload.id);
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_WIKI_SPECPOST_FAILED,});
		} else {
			yield put({type: QUERY_WIKI_SPECPOST_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: QUERY_WIKI_SPECPOST_FAILED,});
	}
}

export function chgPost(id, data) {
	console.info('触发 chgPost');
	data.state = parseInt(data.state, 10);

	return {
		type: CHG_WIKI_SPECPOST,
		payload: {
			id: id,
			data: data,
		}
	};
}

function* chgPostDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/posts/' + action.payload.id, {
				data: action.payload.data
			});
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_WIKI_SPECPOST_FAILED,});
		} else {
			yield put({type: QUERY_WIKI_SPECPOST_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: QUERY_WIKI_SPECPOST_FAILED,});
	}
}

export function* postsSaga() {
	yield all([
		takeEvery(QUERY_WIKI_POSTS, queryPostsDeal),
		takeEvery(ADD_WIKI_SPECPOST, addPostDeal),
		takeEvery(DEL_WIKI_SPECPOST, deletePostDeal),
		takeEvery(QUERY_WIKI_SPECPOST, querySpecPostDeal),
	]);
}
