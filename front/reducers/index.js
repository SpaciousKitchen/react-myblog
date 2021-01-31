import { combineReducers } from 'redux';
import user from './user';
import freeboard from './freeboard';

const rootReducer = combineReducers({
  user: user.reducer,
  freeboard: freeboard.reducer,
});
export default rootReducer;
