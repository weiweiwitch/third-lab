import {fork, all} from "redux-saga/effects";

import * as posts from './posts';
import * as tags from './tags';
import * as projects from './projects';
import * as sections from './projectsections';
import * as goals from './projectgoals';
import * as tasks from './projecttasks';

export function* rootSaga() {
	yield all([
		fork(posts.postsSaga),
		fork(tags.tagsSaga),
		fork(projects.projectsSaga),
		fork(sections.projectSectionsSaga),
		fork(goals.projectGoalsSaga),
		fork(tasks.projectTasksSaga),
	]);
}