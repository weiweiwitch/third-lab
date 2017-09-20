import {all, call, put, takeEvery, fork, race, take, select} from "redux-saga/effects";
import {LOGIN_SUCCESS} from './auth';
import history from '../appHistory';
import {client} from "../client";
import {getSpecTagId} from "../redux/modules/wikitags";

export const QUERY_WIKI_POSTS = 'QUERY_WIKI_POSTS';
export const QUERY_WIKI_POSTS_SUCCESS = 'QUERY_WIKI_POSTS_SUCCESS';
export const QUERY_WIKI_POSTS_FAILED = 'QUERY_WIKI_POSTS_FAILED';

export const QUERY_SPEC_TAG_POSTS = 'QUERY_SPEC_TAG_POSTS';
export const QUERY_SPEC_TAG_POSTS_SUCCESS = 'QUERY_SPEC_TAG_POSTS_SUCCESS';
export const QUERY_SPEC_TAG_POSTS_FAILED = 'QUERY_SPEC_TAG_POSTS_FAILED';

export const ADD_WIKI_SPECPOST = 'ADD_WIKI_SPECPOST';
export const ADD_WIKI_SPECPOST_SUCCESS = 'ADD_WIKI_SPECPOST_SUCCESS';
export const ADD_WIKI_SPECPOST_FAILED = 'ADD_WIKI_SPECPOST_FAILED';

export const DEL_WIKI_SPECPOST = 'DEL_WIKI_SPECPOST';
export const DEL_WIKI_SPECPOST_SUCCESS = 'DEL_WIKI_SPECPOST_SUCCESS';
export const DEL_WIKI_SPECPOST_FAILED = 'DEL_WIKI_SPECPOST_FAILED';

export const QUERY_WIKI_SPECPOST = 'QUERY_WIKI_SPECPOST';
export const QUERY_WIKI_SPECPOST_SUCCESS = 'QUERY_WIKI_SPECPOST_SUCCESS';
export const QUERY_WIKI_SPECPOST_FAILED = 'QUERY_WIKI_SPECPOST_FAILED';

export const CHG_WIKI_SPECPOST = 'CHG_WIKI_SPECPOST';
export const CHG_WIKI_SPECPOST_SUCCESS = 'CHG_WIKI_SPECPOST_SUCCESS';
export const CHG_WIKI_SPECPOST_FAILED = 'CHG_WIKI_SPECPOST_FAILED';

const SHOW_POST = 'SHOW_POST';
const PREPARE_CREATE_POST = 'PREPARE_CREATE_POST';

// 切换到显示文章页面
export function showPost(postId: number): any {
	return {
		type: SHOW_POST,
		payload: {postId},
	};
}

function* showPostDeal(action: any): any {
	// 跳转
	yield call((path: string): any => history.push(path), '/wiki/wikipost/' + action.payload.parentId);
}

// 切换到创建文章页面
export function prepareCreatePost(parentId: number): any {
	return {
		type: PREPARE_CREATE_POST,
		payload: {parentId},
	};
}

function* prepareCreatePostDeal(action: any): any {
	// 跳转
	yield call((path: string): any => history.push(path), '/wiki/wikinew/' + action.payload.parentId);
}

export function queryPosts(): any {
	return {
		type: QUERY_WIKI_POSTS,
	};
}

function* queryPostsDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/posts');
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_WIKI_POSTS_FAILED});
		} else {
			yield put({type: QUERY_WIKI_POSTS_SUCCESS, payload: result.data});
		}

	} catch (e) {
		yield put({type: QUERY_WIKI_POSTS_FAILED});
	}
}

export function querySpecTagPosts(tagId: number): any {
	return {
		type: QUERY_SPEC_TAG_POSTS,
		payload: {
			tagId,
		},
	};
}

function* querySpecTagPostsDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/tags/' + action.payload.tagId + '/posts');
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_SPEC_TAG_POSTS_FAILED});
		} else {
			yield put({
				type: QUERY_SPEC_TAG_POSTS_SUCCESS,
				payload: {
					posts: result.data.posts,
					tagId: result.data.tagId,
				},
			});
		}

	} catch (e) {
		yield put({type: QUERY_SPEC_TAG_POSTS_FAILED});
	}
}

export function addPost(data: any): any {
	data.state = parseInt(data.state, 10);

	return {
		type: ADD_WIKI_SPECPOST,
		payload: data,
	};
}

function* addPostDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/posts', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_WIKI_SPECPOST_FAILED});
		} else {
			yield put({type: ADD_WIKI_SPECPOST_SUCCESS, payload: result.data});

			// 跳转
			yield call((path: string): any => history.push(path), '/wiki/wikiindex');
		}

	} catch (e) {
		yield put({type: ADD_WIKI_SPECPOST_FAILED});
	}
}

export function deletePost(id: number): any {
	return {
		type: DEL_WIKI_SPECPOST,
		payload: {
			id,
		},
	};
}

function* deletePostDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/posts/' + action.payload.id, {
				params: {},
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_WIKI_SPECPOST_FAILED});
		} else {
			yield put({type: DEL_WIKI_SPECPOST_SUCCESS, payload: result.data});
		}

	} catch (e) {
		yield put({type: DEL_WIKI_SPECPOST_FAILED});
	}
}

export function querySpecPost(postId: number): any {
	return {
		type: QUERY_WIKI_SPECPOST,
		payload: {
			id: postId,
		},
	};
}

function* querySpecPostDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/posts/' + action.payload.id);
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_WIKI_SPECPOST_FAILED});
		} else {
			yield put({type: QUERY_WIKI_SPECPOST_SUCCESS, payload: result.data});
		}

	} catch (e) {
		yield put({type: QUERY_WIKI_SPECPOST_FAILED});
	}
}

export function chgPost(id: any, data: any): any {
	return {
		type: CHG_WIKI_SPECPOST,
		payload: {
			id,
			data,
		},
	};
}

function* chgPostDeal(action: any): any {
	try {
		// 发送请求查询
		const postId = action.payload.id;
		const result = yield call(() => {
			return client.put('/api/posts/' + postId, {
				data: action.payload.data,
			});
		});

		if (result.rt !== 1) {
			yield put({type: CHG_WIKI_SPECPOST_FAILED});
		} else {
			yield put({type: CHG_WIKI_SPECPOST_SUCCESS, payload: result.data});

			// 跳转
			yield call((path: string): any => history.push(path), '/wiki/wikipost/' + postId);
		}

	} catch (e) {
		yield put({type: CHG_WIKI_SPECPOST_FAILED});
	}
}

export function* refreshPostsDeal(): any {
	while (true) {
		yield race({
			login: take(LOGIN_SUCCESS),
			addPost: take(ADD_WIKI_SPECPOST_SUCCESS),
			change: take(CHG_WIKI_SPECPOST_SUCCESS),
			delPost: take(DEL_WIKI_SPECPOST_SUCCESS),
		});

		// 触发查询
		yield put(queryPosts()); // 刷新文章

		const specTagId = yield select(getSpecTagId);
		yield put(querySpecTagPosts(specTagId)); // 刷新特定文章
	}
}

export function* refreshSpecPostDeal(): any {
	while (true) {
		const {change} = yield race({
			change: take(CHG_WIKI_SPECPOST_SUCCESS),
		});

		// 触发查询
		yield put(querySpecPost(change.payload.id)); // 刷新特定文章

	}
}

export function* postsSaga(): any {
	yield all([
		takeEvery(SHOW_POST, showPostDeal),
		takeEvery(PREPARE_CREATE_POST, prepareCreatePostDeal),
		takeEvery(QUERY_WIKI_POSTS, queryPostsDeal),
		takeEvery(ADD_WIKI_SPECPOST, addPostDeal),
		takeEvery(DEL_WIKI_SPECPOST, deletePostDeal),
		takeEvery(QUERY_WIKI_SPECPOST, querySpecPostDeal),
		takeEvery(QUERY_SPEC_TAG_POSTS, querySpecTagPostsDeal),
		takeEvery(CHG_WIKI_SPECPOST, chgPostDeal),

		fork(refreshPostsDeal),
		fork(refreshSpecPostDeal),
	]);
}
