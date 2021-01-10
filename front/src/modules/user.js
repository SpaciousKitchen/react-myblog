import { REQUESET_LOGIN, SUCCESS_LOGIN, FAIL_LOGIN } from './actions';
const init = {
  user: 'songsong',
  requesetLogin: false,
  successLogin: false,
  failLogin: false,
};

function userReducers(state = init, action) {
  switch (action) {
    case REQUESET_LOGIN:
      return {
        requesetLogin: true,
        successLogin: false,
        failLogin: false,
      };
    case SUCCESS_LOGIN:
      return {
        requesetLogin: false,
        successLogin: true,
        failLogin: false,
      };
    case FAIL_LOGIN:
      return {
        requesetLogin: false,
        successLogin: false,
        failLogin: true,
      };
    default:
      return state;
  }
}
export default userReducers;
