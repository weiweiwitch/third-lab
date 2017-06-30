import {all, call, put, takeEvery, fork, race, take, select} from "redux-saga/effects";
import {LOGIN_SUCCESS} from './auth';
import {client} from "../client";
import {getSpecProjectId} from "../redux/modules/projects";
import {querySpecProject} from "./projects";

export const ADD_PROJECT_SECTION = 'ADD_PROJECT_SECTION';
export const ADD_PROJECT_SECTION_SUCCESS = 'ADD_PROJECT_SECTION_SUCCESS';
export const ADD_PROJECT_SECTION_FAILED = 'ADD_PROJECT_SECTION_FAILED';

export const DEL_PROJECT_SECTION = 'DEL_PROJECT_SECTION';
export const DEL_PROJECT_SECTION_SUCCESS = 'DEL_PROJECT_SECTION_SUCCESS';
export const DEL_PROJECT_SECTION_FAILED = 'DEL_PROJECT_SECTION_FAILED';

export const CHG_PROJECT_SECTION = 'CHG_PROJECT_SECTION';
export const CHG_PROJECT_SECTION_SUCCESS = 'CHG_PROJECT_SECTION_SUCCESS';
export const CHG_PROJECT_SECTION_FAILED = 'CHG_PROJECT_SECTION_FAILED';

export function addProjectSection(section) {
	return {
		type: ADD_PROJECT_SECTION,
		payload: section,
	};
}

function* addProjectSectionDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/projectSections', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_PROJECT_SECTION_FAILED,});
		} else {
			yield put({type: ADD_PROJECT_SECTION_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: ADD_PROJECT_SECTION_FAILED,});
	}
}

export function deleteProjectSection(id: number) {
	return {
		type: DEL_PROJECT_SECTION,
		payload: {
			id: id,
		}
	};
}

function* deleteProjectSectionDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/projectSections/' + action.payload.id, {
				params: {}
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_PROJECT_SECTION_FAILED,});
		} else {
			yield put({type: DEL_PROJECT_SECTION_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: DEL_PROJECT_SECTION_FAILED,});
	}
}

export function chgProjectSection(id, data) {
	console.info('chgProjectSection');

	return {
		type: CHG_PROJECT_SECTION,
		payload: {
			id: id,
			data: data,
		}
	};
}

function* chgProjectSectionDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/projectSections/' + action.payload.id, {
				data: action.payload.data
			});
		});

		if (result.rt !== 1) {
			yield put({type: CHG_PROJECT_SECTION_FAILED,});
		} else {
			yield put({type: CHG_PROJECT_SECTION_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: CHG_PROJECT_SECTION_FAILED,});
	}
}

export function* refreshProjectSectionsDeal() {
	while (true) {
		yield race({
			addSection: take(ADD_PROJECT_SECTION_SUCCESS),
			chgSection: take(CHG_PROJECT_SECTION_SUCCESS),
			delSection: take(DEL_PROJECT_SECTION_SUCCESS),
		});

		// 触发查询
		const specProjectId = yield select(getSpecProjectId);
		yield put(querySpecProject(specProjectId));
	}
}

export function* projectSectionsSaga() {
	yield all([
		takeEvery(ADD_PROJECT_SECTION, addProjectSectionDeal),
		takeEvery(DEL_PROJECT_SECTION, deleteProjectSectionDeal),
		takeEvery(CHG_PROJECT_SECTION, chgProjectSectionDeal),
		
		fork(refreshProjectSectionsDeal),
	]);
}
