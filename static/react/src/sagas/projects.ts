import {all, call, fork, put, race, take, takeEvery} from "redux-saga/effects";
import {LOGIN_SUCCESS} from "./auth";
import {client} from "../client";

export const CLEAR_CREATE_MARK = 'CLEAR_CREATE_MARK';

export const QUERY_PROJECTS = 'QUERY_PROJECTS';
export const QUERY_PROJECTS_SUCCESS = 'QUERY_PROJECTS_SUCCESS';
export const QUERY_PROJECTS_FAILED = 'QUERY_PROJECTS_FAILED';

export const QUERY_SPEC_PROJECT = 'QUERY_SPEC_PROJECT';
export const QUERY_SPEC_PROJECT_SUCCESS = 'QUERY_SPEC_PROJECT_SUCCESS';
export const QUERY_SPEC_PROJECT_FAILED = 'QUERY_SPEC_PROJECT_FAILED';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILED = 'ADD_PROJECT_FAILED';

export const DEL_PROJECT = 'DEL_PROJECT';
export const DEL_PROJECT_SUCCESS = 'DEL_PROJECT_SUCCESS';
export const DEL_PROJECT_FAILED = 'DEL_PROJECT_FAILED';

export const CHG_PROJECT = 'CHG_PROJECT';
export const CHG_PROJECT_SUCCESS = 'CHG_PROJECT_SUCCESS';
export const CHG_PROJECT_FAILED = 'CHG_PROJECT_FAILED';

export function queryProjects() {
	console.info('queryProjects');
	return {
		type: QUERY_PROJECTS,
	};
}

function* queryProjectsDeal(action) {
	console.info('queryProjectsDeal');
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/projects');
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_PROJECTS_FAILED,});
		} else {
			yield put({
				type: QUERY_PROJECTS_SUCCESS, payload: {
					groups: result.data.groups,
					projects: result.data.projects,
				}
			});
		}

	} catch (e) {
		yield put({type: QUERY_PROJECTS_FAILED,});
	}
}

export function querySpecProject(projectId: number) {
	console.info('querySpecProject');
	return {
		type: QUERY_SPEC_PROJECT,
		payload: projectId,
	};
}

function* querySpecProjectDeal(action) {
	console.info('queryProjectsDeal');
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.get('/api/projects/' + action.payload);
		});

		if (result.rt !== 1) {
			yield put({type: QUERY_SPEC_PROJECT_FAILED,});
		} else {
			yield put({
				type: QUERY_SPEC_PROJECT_SUCCESS, payload: {
					specProject: result.data.project,
					sectionsOfSpecProject: result.data.sections,
					goalsOfSpecProject: result.data.goals,
					tasksOfSpecProject: result.data.tasks,
				}
			});
		}

	} catch (e) {
		yield put({type: QUERY_SPEC_PROJECT_FAILED,});
	}
}

export function addProject(project) {
	return {
		type: ADD_PROJECT,
		payload: project,
	};
}

function* addProjectDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/projects', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_PROJECT_FAILED,});
		} else {
			yield put({type: ADD_PROJECT_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: ADD_PROJECT_FAILED,});
	}
}

export function deleteProject(id: number) {
	return {
		type: DEL_PROJECT,
		payload: {
			id: id,
		}
	};
}

function* deleteProjectDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/projects/' + action.payload.id, {
				params: {}
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_PROJECT_FAILED,});
		} else {
			yield put({type: DEL_PROJECT_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: DEL_PROJECT_FAILED,});
	}
}

export function chgProject(id, data) {
	console.info('chgProject');

	return {
		type: CHG_PROJECT,
		payload: {
			id: id,
			data: data,
		}
	};
}

function* chgProjectDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/projects/' + action.payload.id, {
				data: action.payload.data
			});
		});

		if (result.rt !== 1) {
			yield put({type: CHG_PROJECT_FAILED,});
		} else {
			yield put({type: CHG_PROJECT_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: CHG_PROJECT_FAILED,});
	}
}

export function* refreshProjectsDeal() {
	while (true) {
		yield race({
			login: take(LOGIN_SUCCESS),
			addProject: take(ADD_PROJECT_SUCCESS),
			chgProject: take(CHG_PROJECT_SUCCESS),
			delProject: take(DEL_PROJECT_SUCCESS),
		});

		// 触发查询
		yield put(queryProjects()); // 刷新文章
	}
}

export function* projectsSaga() {
	yield all([
		takeEvery(QUERY_PROJECTS, queryProjectsDeal),
		takeEvery(ADD_PROJECT, addProjectDeal),
		takeEvery(DEL_PROJECT, deleteProjectDeal),
		takeEvery(CHG_PROJECT, chgProjectDeal),
		takeEvery(QUERY_SPEC_PROJECT, querySpecProjectDeal),
		
		fork(refreshProjectsDeal),
	]);
}
