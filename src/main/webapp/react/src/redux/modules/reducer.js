import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// 组合reducer
export default combineReducers({
  routing: routerReducer
});
