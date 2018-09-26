import {all, call, fork, put, race, take, takeEvery} from "redux-saga/effects";
import {LOGIN_SUCCESS} from './auth';
import history from '../appHistory';
import {client} from "../client";

export const QUERY_SUMMARY = 'QUERY_SUMMARY';
export const QUERY_SUMMARY_SUCCESS = 'QUERY_SUMMARY_SUCCESS';
export const QUERY_SUMMARY_FAILED = 'QUERY_SUMMARY_FAILED';

export const MODIFY_SUMMARY = 'MODIFY_SUMMARY';
export const MODIFY_SUMMARY_SUCCESS = 'MODIFY_SUMMARY_SUCCESS';
export const MODIFY_SUMMARY_FAILED = 'MODIFY_SUMMARY_FAILED';

export function querySummary(): any {
	return {
		type: QUERY_SUMMARY,
	};
}

function* querySummaryDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/summary');
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_SUMMARY_FAILED});
		} else {
			yield put({type: QUERY_SUMMARY_SUCCESS, payload: result.data});
		}

	} catch (e) {
		yield put({type: QUERY_SUMMARY_FAILED});
	}
}

export function modifySummary(summary: string): any {
	return {
		type: MODIFY_SUMMARY,
		payload: {
			summary,
		},
	};
}

function* modifySummaryDeal(action: any): any {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/summary', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: MODIFY_SUMMARY_FAILED});
		} else {
			yield put({type: MODIFY_SUMMARY_SUCCESS, payload: result.data});

			// 跳转
			yield call((path: string): any => history.push(path), '/');
		}

	} catch (e) {
		yield put({type: MODIFY_SUMMARY_FAILED});
	}
}

export function* refreshSummaryDeal(): any {
	while (true) {
		yield race({
			login: take(LOGIN_SUCCESS),
		});

		// 触发查询
		yield put(querySummary());
	}
}

export function* summarySaga(): any {
	yield all([
		takeEvery(QUERY_SUMMARY, querySummaryDeal),
		takeEvery(MODIFY_SUMMARY, modifySummaryDeal),

		fork(refreshSummaryDeal),
	]);
}
