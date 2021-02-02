import { combineReducers } from 'redux';
import axios from 'axios';
import user from './user';
import freeboard from './freeboard';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user: user.reducer,
  freeboard: freeboard.reducer,
});
export default rootReducer;
