import {CHG_WIKI_SPECPOST_SUCCESS, QUERY_WIKI_SPECPOST_SUCCESS} from "../../sagas/posts";

export class TagOfSpecPostData {
	id: number;
	tagName: string;
}

export class SpecPostData {
	id: number;
	title: string;
	postText: string;
	parentId: number;
	status: number;
	tags: TagOfSpecPostData[];

	constructor() {
		this.postText = '';
		this.tags = [];
	}
}

export class WikiSpecPostState {
	wikipost: SpecPostData;

	constructor() {
		this.wikipost = new SpecPostData();
	}
}

export default function reducer(state: WikiSpecPostState = new WikiSpecPostState(), action: any = {}): WikiSpecPostState {
	switch (action.type) {
		case QUERY_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
				wikipost: action.payload,
			};
		case CHG_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
			};
		default:
			return state;
	}
}
