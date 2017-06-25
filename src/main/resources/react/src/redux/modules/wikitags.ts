import {
	ADD_WIKI_SPECTAG_SUCCESS,
	DEL_WIKI_SPECTAG_SUCCESS,
	QUERY_WIKI_TAGS_SUCCESS
} from "../../sagas/tags";

const initialState = {
	wikitagtree: [],
	wikitaglist: [],
	createSuccess: false,
	dirty: false
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case QUERY_WIKI_TAGS_SUCCESS:
			console.info('reducer query tags success');
			console.info(action.payload);

			return {
				...state,
				wikitagtree: action.payload.tagTree,
				wikitaglist: action.payload.tagList,
				dirty: false
			};
		case ADD_WIKI_SPECTAG_SUCCESS:
			console.info('reducer add spec tag success');
			console.info(action.payload);
			return {
				...state,
				createSuccess: true,
				dirty: true
			};
		case DEL_WIKI_SPECTAG_SUCCESS:
			console.info('reducer del spec tag success');
			console.info(action.payload);
			return {
				...state,
				dirty: true
			};
		default:
			return state;
	}
}
