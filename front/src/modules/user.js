import {
  REQUEST_GOOGLE_LOGIN,
  SUCCESS_GOOGLE_LOGIN,
  FAIL_GOOGLE_LOGIN,
  REQUEST_KAKAO_LOGIN,
  SUCCESS_KAKAO_LOGIN,
  FAIL_KAKAO_LOGIN,
  REQUEST_NAVER_LOGIN,
  SUCCESS_NAVER_LOGIN,
  FAIL_NAVER_LOGIN,
} from './actions';

const init = {
  user: null,
  requestLogin: false,
  successLogin: false,
  failLogin: false,
};

function userReducers(state = init, action) {
  switch (action.type) {
    case REQUEST_GOOGLE_LOGIN:
    case REQUEST_NAVER_LOGIN:
    case REQUEST_KAKAO_LOGIN:
      return {
        requestLogin: true,
        successLogin: false,
        failLogin: false,
        user: { id: action.data.id, name: action.data.name },
      };
    case SUCCESS_GOOGLE_LOGIN:
    case SUCCESS_KAKAO_LOGIN:
    case SUCCESS_NAVER_LOGIN:
      return {
        requestLogin: false,
        successLogin: true,
        failLogin: false,
      };
    case FAIL_GOOGLE_LOGIN:
    case FAIL_KAKAO_LOGIN:
    case FAIL_NAVER_LOGIN:
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
