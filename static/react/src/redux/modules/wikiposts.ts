import {
	ADD_WIKI_SPECPOST_SUCCESS,
	DEL_WIKI_SPECPOST_SUCCESS,
	QUERY_WIKI_POSTS_SUCCESS,
	QUERY_SPEC_TAG_POSTS_SUCCESS,
} from "../../sagas/posts";

class WikiPostsState {
	wikiposts: any[];
	postsOfSpecTag: any[];
	specTagId: number;
	dirty: boolean;

	constructor() {
		this.wikiposts = [];
		this.postsOfSpecTag = [];
		this.specTagId = 0;
		this.dirty = false;
	}
}

export default function reducer(state: WikiPostsState = new WikiPostsState(), action: any = {}): WikiPostsState {
	switch (action.type) {
		case QUERY_WIKI_POSTS_SUCCESS:
			return {
				...state,
				wikiposts: action.payload,
				dirty: false,
			};
		case QUERY_SPEC_TAG_POSTS_SUCCESS:
			return {
				...state,
				postsOfSpecTag: action.payload.posts,
				specTagId: action.payload.tagId,
				dirty: false,
			};
		case ADD_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				dirty: true,
			};
		case DEL_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				dirty: true,
			};
		default:
			return state;
	}
}
