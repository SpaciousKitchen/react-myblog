import { combineReducers } from 'redux';
import user from './user';
import freeboard from './freeboard';

const rootReducer = combineReducers({
  user,
  freeboard,
});
export default rootReducer;
