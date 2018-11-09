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

export class WikiTagData {
    id: number;
    tagName: string;
    parentTagId: number;
    nodes: WikiTagData[];
}

export class WikiTagsState {
    wikitagtree: any[];
    wikitaglist: WikiTagData[];
    wikitagMap: Map<number, WikiTagData>;
    specTagId: number;

    constructor() {
        this.wikitagtree = [];
        this.wikitaglist = [];
        this.wikitagMap = new Map<number, WikiTagData>();
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
            const wikitagtree = action.payload.tagTree; // 顶层标签
            wikitagtree.push({
                id: 0,
                tagName: '未归类',
                parentTagId: 0,
            });

            const tagMap = new Map<number, WikiTagData>();
            action.payload.tagList.forEach((eachTag: WikiTagData) => {
                tagMap[eachTag.id] = eachTag;
            });
            return {
                ...state,
                wikitagtree,
                wikitaglist: action.payload.tagList,
                wikitagMap: tagMap,
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
