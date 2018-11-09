import {
	ADD_WIKI_SPECPOST_SUCCESS,
	DEL_WIKI_SPECPOST_SUCCESS,
	QUERY_WIKI_POSTS_SUCCESS,
	QUERY_SPEC_TAG_POSTS_SUCCESS,
} from "../../sagas/posts";

export interface IPostData {
	id: number;
	title: string;
	parentId: number;
	status: number;
	tagId: number;
}

export interface IPostOfTagData {
	id: number;
	title: string;
	parentId: number;
	status: number;
}

export class WikiPostsState {
	wikiposts: IPostData[];
	postsOfSpecTag: IPostOfTagData[];
	specTagId: number; // 当前正在查看哪个Tag的文章群。

	constructor() {
		this.wikiposts = [];
		this.postsOfSpecTag = [];
		this.specTagId = 0;
	}
}

export default function reducer(state: WikiPostsState = new WikiPostsState(), action: any = {}): WikiPostsState {
	switch (action.type) {
		case QUERY_WIKI_POSTS_SUCCESS:
			return {
				...state,
				wikiposts: action.payload,
			};
		case QUERY_SPEC_TAG_POSTS_SUCCESS:
			return {
				...state,
				postsOfSpecTag: action.payload.posts,
				specTagId: action.payload.tagId,
			};
		case ADD_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
			};
		case DEL_WIKI_SPECPOST_SUCCESS:
			return {
				...state,
			};
		default:
			return state;
	}
}
