import { REQUEST_LOGIN, SUCCESS_LOGIN, FAIL_LOGIN } from './actions';

const init = {
  user: 'songsong',
  requestLogin: false,
  successLogin: false,
  failLogin: false,
};

function userReducers(state = init, action) {
  switch (action) {
    case REQUEST_LOGIN:
      return {
        requestLogin: true,
        successLogin: false,
        failLogin: false,
      };
    case SUCCESS_LOGIN:
      return {
        requestLogin: false,
        successLogin: true,
        failLogin: false,
      };
    case FAIL_LOGIN:
      return {
        requestLogin: false,
        successLogin: false,
        failLogin: true,
      };
    default:
      return state;
  }
}
export default userReducers;
