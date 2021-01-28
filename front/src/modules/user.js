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
  REQUEST_LOGOUT,
  SUCCESS_LOGOUT,
  FAIL_LOGOUT,
} from './actions';

const init = {
  userInfo: null,
  requestLogin: false,
  successLogin: false,
  failLogin: false,
  requestLogout: false,
  successLogout: false,
  failLogout: false,
};

function userReducers(state = init, action) {
  switch (action.type) {
    case REQUEST_GOOGLE_LOGIN:
    case REQUEST_NAVER_LOGIN:
    case REQUEST_KAKAO_LOGIN:
      return {
        ...state,
        requestLogin: true,
        successLogin: false,
        failLogin: false,
      };
    case SUCCESS_GOOGLE_LOGIN:
    case SUCCESS_KAKAO_LOGIN:
    case SUCCESS_NAVER_LOGIN:
      return {
        ...state,
        requestLogin: false,
        successLogin: true,
        failLogin: false,
        userInfo: {
          id: action.data.id,
          name: action.data.name,
          img: action.data.img,
          eamil: action.data.email,
          logoUrl: action.data.logoUrl,
          option: action.data.option,
        },
      };
    case FAIL_GOOGLE_LOGIN:
    case FAIL_KAKAO_LOGIN:
    case FAIL_NAVER_LOGIN:
      return {
        ...state,
        requestLogin: false,
        successLogin: false,
        failLogin: true,
      };

    case REQUEST_LOGOUT:
      return {
        ...state,
        requestLogout: true,
        successLogout: false,
        failLogout: false,
      };
    case SUCCESS_LOGOUT:
      return {
        ...state,
        requestLogout: false,
        successLogout: true,
        failLogout: false,
        userInfo: null,
      };
    case FAIL_LOGOUT:
      return {
        ...state,
        requestLogout: false,
        successLogout: false,
        failLogout: true,
      };
    default:
      return state;
  }
}
export default userReducers;
