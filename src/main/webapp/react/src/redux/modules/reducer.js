import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import wikiposts from './wikiposts';

// 组合reducer
export default combineReducers({
  routing: routerReducer,
  wikiposts
});
