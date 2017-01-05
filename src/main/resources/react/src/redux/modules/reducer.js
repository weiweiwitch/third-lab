import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import wikiposts from './wikiposts';
import wikispecpost from './wikispecpost';
import examcategory from './examcategory';
import examcategoryquestions from './examcategoryquestions';
import examexec from './examexec';

// 组合reducer
export default combineReducers({
  routing: routerReducer,
  wikiposts,
  wikispecpost,
  examcategory,
  examcategoryquestions,
  examexec
});
