import {all, call, put, takeEvery, fork, race, take, select} from "redux-saga/effects";
import {LOGIN_SUCCESS} from './auth';
import {client} from "../client";
import {getSpecProjectId} from "../redux/modules/projects";
import {querySpecProject} from "./projects";

export const ADD_PROJECT_GOAL = 'ADD_PROJECT_GOAL';
export const ADD_PROJECT_GOAL_SUCCESS = 'ADD_PROJECT_GOAL_SUCCESS';
export const ADD_PROJECT_GOAL_FAILED = 'ADD_PROJECT_GOAL_FAILED';

export const DEL_PROJECT_GOAL = 'DEL_PROJECT_GOAL';
export const DEL_PROJECT_GOAL_SUCCESS = 'DEL_PROJECT_GOAL_SUCCESS';
export const DEL_PROJECT_GOAL_FAILED = 'DEL_PROJECT_GOAL_FAILED';

export const CHG_PROJECT_GOAL = 'CHG_PROJECT_GOAL';
export const CHG_PROJECT_GOAL_SUCCESS = 'CHG_PROJECT_GOAL_SUCCESS';
export const CHG_PROJECT_GOAL_FAILED = 'CHG_PROJECT_GOAL_FAILED';

export function addProjectGoal(goal) {
	return {
		type: ADD_PROJECT_GOAL,
		payload: goal,
	};
}

function* addProjectGoalDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.post('/api/projectGoals', {
				data: action.payload,
			});
		});

		if (result.rt !== 1) {
			yield put({type: ADD_PROJECT_GOAL_FAILED,});
		} else {
			yield put({type: ADD_PROJECT_GOAL_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: ADD_PROJECT_GOAL_FAILED,});
	}
}

export function deleteProjectGoal(id: number) {
	return {
		type: DEL_PROJECT_GOAL,
		payload: {
			id: id,
		}
	};
}

function* deleteProjectGoalDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.del('/api/projectGoals/' + action.payload.id, {
				params: {}
			});
		});

		if (result.rt !== 1) {
			yield put({type: DEL_PROJECT_GOAL_FAILED,});
		} else {
			yield put({type: DEL_PROJECT_GOAL_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: DEL_PROJECT_GOAL_FAILED,});
	}
}

export function chgProjectGoal(id, data) {
	console.info('chgProjectGoal');

	return {
		type: CHG_PROJECT_GOAL,
		payload: {
			id: id,
			data: data,
		}
	};
}

function* chgProjectGoalDeal(action) {
	try {
		// 发送请求查询
		const result = yield call(() => {
			return client.put('/api/projectGoals/' + action.payload.id, {
				data: action.payload.data
			});
		});

		if (result.rt !== 1) {
			yield put({type: CHG_PROJECT_GOAL_FAILED,});
		} else {
			yield put({type: CHG_PROJECT_GOAL_SUCCESS, payload: result.data,});
		}

	} catch (e) {
		yield put({type: CHG_PROJECT_GOAL_FAILED,});
	}
}

export function* refreshProjectGoalsDeal() {
	while (true) {
		yield race({
			addGoal: take(ADD_PROJECT_GOAL_SUCCESS),
			chgGoal: take(CHG_PROJECT_GOAL_SUCCESS),
			delGoal: take(DEL_PROJECT_GOAL_SUCCESS),
		});

		// 触发查询
		const specProjectId = yield select(getSpecProjectId);
		yield put(querySpecProject(specProjectId));
	}
}

export function* projectGoalsSaga() {
	yield all([
		takeEvery(ADD_PROJECT_GOAL, addProjectGoalDeal),
		takeEvery(DEL_PROJECT_GOAL, deleteProjectGoalDeal),
		takeEvery(CHG_PROJECT_GOAL, chgProjectGoalDeal),
		
		fork(refreshProjectGoalsDeal),
	]);
}
