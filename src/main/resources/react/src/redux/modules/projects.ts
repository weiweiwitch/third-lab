import {
	ADD_PROJECT_SUCCESS,
	DEL_PROJECT_SUCCESS,
	QUERY_PROJECTS_SUCCESS,
} from "../../sagas/projects";

const initialState = {
	projects: [],
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case QUERY_PROJECTS_SUCCESS:
			return {
				...state,
				projects: action.payload,
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
