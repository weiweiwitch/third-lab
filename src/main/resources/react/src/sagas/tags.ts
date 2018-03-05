import {all, call, put, takeEvery, fork, race, take} from "redux-saga/effects";

import {ADD_WIKI_SPECPOST_SUCCESS, CHG_WIKI_SPECPOST_SUCCESS} from './posts';
import {LOGIN_SUCCESS} from './auth';
import history from '../appHistory';
import {client} from "../client";

export const QUERY_WIKI_TAGS = 'QUERY_WIKI_TAGS';
export const QUERY_WIKI_TAGS_SUCCESS = 'QUERY_WIKI_TAGS_SUCCESS';
export const QUERY_WIKI_TAGS_FAILED = 'QUERY_WIKI_TAGS_FAILED';

export const ADD_WIKI_SPECTAG = 'ADD_WIKI_SPECTAG';
export const ADD_WIKI_SPECTAG_SUCCESS = 'ADD_WIKI_SPECTAG_SUCCESS';
export const ADD_WIKI_SPECTAG_FAILED = 'ADD_WIKI_SPECTAG_FAILED';

export const DEL_WIKI_SPECTAG = 'DEL_WIKI_SPECTAG';
export const DEL_WIKI_SPECTAG_SUCCESS = 'DEL_WIKI_SPECTAG_SUCCESS';
export const DEL_WIKI_SPECTAG_FAILED = 'DEL_WIKI_SPECTAG_FAILED';

export const CHANGE_WIKI_SPEC_TAG = 'CHANGE_WIKI_SPEC_TAG';
export const CHANGE_WIKI_SPEC_TAG_SUCCESS = 'CHANGE_WIKI_SPEC_TAG_SUCCESS';
export const CHANGE_WIKI_SPEC_TAG_FAILED = 'CHANGE_WIKI_SPEC_TAG_FAILED';

export function queryTags(): any {
	return {
		type: QUERY_WIKI_TAGS,
	};
}

function* queryTagsDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/tags');
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_WIKI_TAGS_FAILED});
		} else {
			yield put({
				type: QUERY_WIKI_TAGS_SUCCESS,
				payload: {
					tagTree: result.data.tree,
					tagList: result.data.list,
				},
			});
		}

	} catch (e) {
		yield put({type: QUERY_WIKI_TAGS_FAILED});
	}
}

export function addTag(data: any): any {
	data.state = parseInt(data.state, 10);

	return {
		type: ADD_WIKI_SPECTAG,
		payload: data,
	};
}

function* addTagDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/tags', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_WIKI_SPECTAG_FAILED});
		} else {
			yield put({type: ADD_WIKI_SPECTAG_SUCCESS, payload: result.data});

			// 跳转
			yield call((path: string): any => history.push(path), '/wiki/wikiindex');
		}

	} catch (e) {
		yield put({type: ADD_WIKI_SPECTAG_FAILED});
	}
}

export function deleteTag(id: number): any {
	return {
		type: DEL_WIKI_SPECTAG,
		payload: {
			id,
		},
	};
}

function* deleteTagDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/tags/' + action.payload.id, {
				params: {},
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_WIKI_SPECTAG_FAILED});
		} else {
			yield put({type: DEL_WIKI_SPECTAG_SUCCESS, payload: result.data});

			// 跳转
			yield call((path: string): any => history.push(path), '/wiki/wikiindex');
		}

	} catch (e) {
		yield put({type: DEL_WIKI_SPECTAG_FAILED});
	}
}

// 修改标签
export function changeTag(id: number, data: any): any {
	return {
		type: CHANGE_WIKI_SPEC_TAG,
		payload: {
			id,
			data,
		},
	};
}

function* changeTagDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/tags/' + action.payload.id, {
				data: action.payload.data,
			});
		});

		if (result.rt !== 1) {
			yield put({type: CHANGE_WIKI_SPEC_TAG_FAILED});
		} else {
			yield put({type: CHANGE_WIKI_SPEC_TAG_SUCCESS, payload: result.data});

			// 跳转
			yield call((path: string): any => history.push(path), '/wiki/wikiindex');
		}

	} catch (e) {
		yield put({type: CHANGE_WIKI_SPEC_TAG_FAILED});
	}
}

export function* refreshTagsDeal(): any {
	while (true) {
		yield race({
			login: take(LOGIN_SUCCESS),
			addTag: take(ADD_WIKI_SPECTAG_SUCCESS),
			modifyTag: take(CHANGE_WIKI_SPEC_TAG_SUCCESS),
			delTag: take(DEL_WIKI_SPECTAG_SUCCESS),
		});

		// 触发查询
		yield put(queryTags());
	}
}

export function* tagsSaga(): any {
	yield all([
		takeEvery(QUERY_WIKI_TAGS, queryTagsDeal),
		takeEvery(ADD_WIKI_SPECTAG, addTagDeal),
		takeEvery(DEL_WIKI_SPECTAG, deleteTagDeal),
		takeEvery(CHANGE_WIKI_SPEC_TAG, changeTagDeal),

		fork(refreshTagsDeal),
	]);
}
