import {
	ADD_WIKI_SPECPOST_SUCCESS,
	CLEAR_CREATE_MARK,
	DEL_WIKI_SPECPOST_SUCCESS,
	QUERY_WIKI_POSTS_SUCCESS
} from "../../sagas/posts";

const initialState = {
	wikiposts: [],
	createSuccess: false,
	dirty: false
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case CLEAR_CREATE_MARK:
			console.info('清空创建成功的标记');
			return {
				...state,
				createSuccess: false
			};
		case QUERY_WIKI_POSTS_SUCCESS:
			return {
				...state,
				wikiposts: action.payload,
				dirty: false
			};
		case ADD_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				createSuccess: true,
				dirty: true
			};
		case DEL_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				dirty: true
			};
		default:
			return state;
	}
}
