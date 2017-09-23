import {combineReducers} from "redux";
import wikiposts from "./wikiposts";
import wikispecpost from "./wikispecpost";
import wikitags from "./wikitags";
import summary from "./summary";

// 组合reducer
export default combineReducers({
	wikiposts,
	wikispecpost,
	wikitags,
	summary,
});
