import {CHG_WIKI_SPECPOST_SUCCESS, CLEAR_MODIFY_MARK, QUERY_WIKI_SPECPOST_SUCCESS} from "../../sagas/posts";

const initialState = {
	wikipost: {
		postText: '',
		tags: [],
	},
	modifySuccess: false,
	dirty: false,
};

export default function reducer(state: any = initialState, action: any = {}): any {
	switch (action.type) {
		case CLEAR_MODIFY_MARK:
			return {
				...state,
				modifySuccess: false,
			};
		case QUERY_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				wikipost: action.payload,
				dirty: false,
			};
		case CHG_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				modifySuccess: true,
				dirty: true,
			};
		default:
			return state;
	}
}
