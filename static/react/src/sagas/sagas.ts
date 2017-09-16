import {all, fork} from "redux-saga/effects";

import * as posts from './posts';
import * as tags from './tags';

export function* rootSaga(): any {
	yield all([
		fork(posts.postsSaga),
		fork(tags.tagsSaga),
	]);
}