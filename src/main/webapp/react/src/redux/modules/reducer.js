import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import wikiposts from './wikiposts';
import wikispecpost from './wikispecpost';

// 组合reducer
export default combineReducers({
  routing: routerReducer,
  wikiposts,
  wikispecpost
});
