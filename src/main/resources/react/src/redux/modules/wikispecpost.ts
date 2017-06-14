import {CHG_WIKI_SPECPOST_SUCCESS, CLEAR_MODIFY_MARK, QUERY_WIKI_SPECPOST_SUCCESS} from "../../sagas/posts";

const initialState = {
	wikipost: {
		postText: ''
	},
	modifySuccess: false,
	dirty: false
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case CLEAR_MODIFY_MARK:
			return {
				...state,
				modifySuccess: false
			};
		case QUERY_WIKI_SPECPOST_SUCCESS:
			console.info('reducer query spec post success');
			console.info(action.payload);

			return {
				...state,
				wikipost: action.payload,
				dirty: false
			};
		case CHG_WIKI_SPECPOST_SUCCESS:
			console.info('reducer chg spec post success');
			console.info(action.payload);
			return {
				...state,
				modifySuccess: true,
				dirty: true
			};
		default:
			return state;
	}
}
