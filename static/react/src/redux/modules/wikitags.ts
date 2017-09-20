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

export class WikiTagsState {
	wikitagtree: any[];
	wikitaglist: any[];
	specTagId: number;

	constructor() {
		this.wikitagtree = [];
		this.wikitaglist = [];
		this.specTagId = 0;
	}
}

export default function reducer(state: WikiTagsState = new WikiTagsState(), action: any = {}): WikiTagsState {
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
			};
		case ADD_WIKI_SPECTAG_SUCCESS:
			return {
				...state,
			};
		case DEL_WIKI_SPECTAG_SUCCESS:
			return {
				...state,
			};
		default:
			return state;
	}
}
