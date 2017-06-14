import {fork, all} from "redux-saga/effects";

import * as posts from './posts';

export function* rootSaga() {
	yield all([
		fork(posts.postsSaga),
	]);
}