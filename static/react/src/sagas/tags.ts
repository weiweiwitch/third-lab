import {all, call, put, takeEvery, fork, race, take} from "redux-saga/effects";

import {ADD_WIKI_SPECPOST_SUCCESS, CHG_WIKI_SPECPOST_SUCCESS} from './posts';
import {LOGIN_SUCCESS} from './auth';

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
		}

	} catch (e) {
		yield put({type: DEL_WIKI_SPECTAG_FAILED});
	}
}

export function* refreshPostsDeal(): any {
	while (true) {
		yield race({
			login: take(LOGIN_SUCCESS),
			addPost: take(ADD_WIKI_SPECPOST_SUCCESS),
			modifyPost: take(CHG_WIKI_SPECPOST_SUCCESS),
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

		fork(refreshPostsDeal),
	]);
}
