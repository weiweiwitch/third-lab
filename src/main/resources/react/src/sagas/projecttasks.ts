import {all, call, put, takeEvery, fork, race, take, select} from "redux-saga/effects";
import {LOGIN_SUCCESS} from './auth';
import {client} from "../client";
import {getSpecProjectId} from "../redux/modules/projects";
import {querySpecProject} from "./projects";

export const ADD_PROJECT_TASK = 'ADD_PROJECT_TASK';
export const ADD_PROJECT_TASK_SUCCESS = 'ADD_PROJECT_TASK_SUCCESS';
export const ADD_PROJECT_TASK_FAILED = 'ADD_PROJECT_TASK_FAILED';

export const DEL_PROJECT_TASK = 'DEL_PROJECT_TASK';
export const DEL_PROJECT_TASK_SUCCESS = 'DEL_PROJECT_TASK_SUCCESS';
export const DEL_PROJECT_TASK_FAILED = 'DEL_PROJECT_TASK_FAILED';

export const CHG_PROJECT_TASK = 'CHG_PROJECT_TASK';
export const CHG_PROJECT_TASK_SUCCESS = 'CHG_PROJECT_TASK_SUCCESS';
export const CHG_PROJECT_TASK_FAILED = 'CHG_PROJECT_TASK_FAILED';

export function addProjectTask(task) {
	return {
		type: ADD_PROJECT_TASK,
		payload: task,
	};
}

function* addProjectTaskDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/projectTasks', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_PROJECT_TASK_FAILED,});
		} else {
			yield put({type: ADD_PROJECT_TASK_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: ADD_PROJECT_TASK_FAILED,});
	}
}

export function deleteProjectTask(id: number) {
	return {
		type: DEL_PROJECT_TASK,
		payload: {
			id: id,
		}
	};
}

function* deleteProjectTaskDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/projectTasks/' + action.payload.id, {
				params: {}
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_PROJECT_TASK_FAILED,});
		} else {
			yield put({type: DEL_PROJECT_TASK_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: DEL_PROJECT_TASK_FAILED,});
	}
}

export function chgProjectTask(id, data) {
	console.info('chgProjectTask');

	return {
		type: CHG_PROJECT_TASK,
		payload: {
			id: id,
			data: data,
		}
	};
}

function* chgProjectTaskDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/projectTasks/' + action.payload.id, {
				data: action.payload.data
			});
		});

		if (result.rt !== 1) {
			yield put({type: CHG_PROJECT_TASK_FAILED,});
		} else {
			yield put({type: CHG_PROJECT_TASK_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: CHG_PROJECT_TASK_FAILED,});
	}
}

export function* refreshProjectTasksDeal() {
	while (true) {
		yield race({
			addTask: take(ADD_PROJECT_TASK_SUCCESS),
			chgTask: take(CHG_PROJECT_TASK_SUCCESS),
			delTask: take(DEL_PROJECT_TASK_SUCCESS),
		});

		// 触发查询
		const specProjectId = yield select(getSpecProjectId);
		yield put(querySpecProject(specProjectId));
	}
}

export function* projectTasksSaga() {
	yield all([
		takeEvery(ADD_PROJECT_TASK, addProjectTaskDeal),
		takeEvery(DEL_PROJECT_TASK, deleteProjectTaskDeal),
		takeEvery(CHG_PROJECT_TASK, chgProjectTaskDeal),
		
		fork(refreshProjectTasksDeal),
	]);
}
