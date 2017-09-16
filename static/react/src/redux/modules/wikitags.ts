import {
	ADD_WIKI_SPECTAG_SUCCESS,
	DEL_WIKI_SPECTAG_SUCCESS,
	QUERY_WIKI_TAGS_SUCCESS,
} from "../../sagas/tags";
import {
	QUERY_SPEC_TAG_POSTS,
} from "../../sagas/posts";

export function getSpecTagId(state: any): number {
	return state.wikitags.specTagId;
}

const initialState = {
	wikitagtree: [],
	wikitaglist: [],
	specTagId: 0,
	createSuccess: false,
	dirty: false,
};

export default function reducer(state: any = initialState, action: any = {}): any {
	switch (action.type) {
		case QUERY_SPEC_TAG_POSTS:
			return {
				...state,
				specTagId: action.payload.tagId,
			};

		case QUERY_WIKI_TAGS_SUCCESS:
			const wikitagtree = action.payload.tagTree;
			wikitagtree.push({
				id: 0,
				tagName: '未归类',
				parentTagId: 0,
			});
			return {
				...state,
				wikitagtree,
				wikitaglist: action.payload.tagList,
				dirty: false,
			};
		case ADD_WIKI_SPECTAG_SUCCESS:
			return {
				...state,
				createSuccess: true,
				dirty: true,
			};
		case DEL_WIKI_SPECTAG_SUCCESS:
			return {
				...state,
				dirty: true,
			};
		default:
			return state;
	}
}
