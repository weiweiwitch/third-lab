import {CHG_WIKI_SPECPOST_SUCCESS, QUERY_WIKI_SPECPOST_SUCCESS} from "../../sagas/posts";

class WikiPost {
	postText: string;
	tags: any[];

	constructor() {
		this.postText = '';
		this.tags = [];
	}
}

class WikiSpecPostState {
	wikipost: WikiPost;
	dirty: boolean;

	constructor() {
		this.wikipost = new WikiPost();
		this.dirty = false;
	}
}

export default function reducer(state: WikiSpecPostState = new WikiSpecPostState(), action: any = {}): WikiSpecPostState {
	switch (action.type) {
		case QUERY_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				wikipost: action.payload,
				dirty: false,
			};
		case CHG_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				dirty: true,
			};
		default:
			return state;
	}
}
