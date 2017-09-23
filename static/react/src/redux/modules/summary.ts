import {
	MODIFY_SUMMARY_SUCCESS,
	QUERY_SUMMARY_SUCCESS,
} from "../../sagas/summary";

export class SummaryState {
	summary: string;

	constructor() {
		this.summary = '';
	}
}

export default function reducer(state: SummaryState = new SummaryState(), action: any = {}): SummaryState {
	switch (action.type) {
		case QUERY_SUMMARY_SUCCESS:
			return {
				...state,
				summary: action.payload.summary,
			};
		case MODIFY_SUMMARY_SUCCESS:
			return {
				...state,
			};
		default:
			return state;
	}
}
