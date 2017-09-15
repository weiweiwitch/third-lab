import {
	ADD_PROJECT_SUCCESS,
	DEL_PROJECT_SUCCESS,
	QUERY_PROJECTS_SUCCESS,
	QUERY_SPEC_PROJECT_SUCCESS,
} from "../../sagas/projects";

export function getSpecProjectId(state): number {
	return state.projects.specProjectId;
}

const initialState = {
	specProjectId: 0,
	specProject: {},
	sectionsOfSpecProject: [],
	goalsOfSpecProject: [],
	tasksOfSpecProject: [],

	projects: [],
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case QUERY_PROJECTS_SUCCESS:
			return {
				...state,
				projects: action.payload.projects,
			};
		case QUERY_SPEC_PROJECT_SUCCESS:
			return {
				...state,
				specProjectId: action.payload.specProject.id,
				specProject: action.payload.specProject,
				sectionsOfSpecProject: action.payload.sectionsOfSpecProject,
				goalsOfSpecProject: action.payload.goalsOfSpecProject,
				tasksOfSpecProject: action.payload.tasksOfSpecProject,
			};
		case ADD_PROJECT_SUCCESS:
			return {
				...state,
			};
		case DEL_PROJECT_SUCCESS:
			return {
				...state,
			};
		default:
			return state;
	}
}
