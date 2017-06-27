import {fork, all} from "redux-saga/effects";

import * as posts from './posts';
import * as tags from './tags';
import * as projects from './projects';

export function* rootSaga() {
	yield all([
		fork(posts.postsSaga),
		fork(tags.tagsSaga),
		fork(projects.projectsSaga),
	]);
}