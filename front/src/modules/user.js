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
  REQUEST_GOOGLE_LOGOUT,
  SUCCESS_GOOGLE_LOGOUT,
  FAIL_GOOGLE_LOGOUT,
  REQUEST_KAKAO_LOGOUT,
  SUCCESS_KAKAO_LOGOUT,
  FAIL_KAKAO_LOGOUT,
  REQUEST_NAVER_LOGOUT,
  SUCCESS_NAVER_LOGOUT,
  FAIL_NAVER_LOGOUT,
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
      console.log(action.option);
      return {
        ...state,
        requestLogin: true,
        successLogin: false,
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

    case REQUEST_GOOGLE_LOGOUT:
    case REQUEST_NAVER_LOGOUT:
    case REQUEST_KAKAO_LOGOUT:
      console.log(action.option);
      return {
        ...state,
        requestLogout: true,
        successLogout: false,
        failLogout: false,
        userInfo: null,
      };
    case SUCCESS_GOOGLE_LOGOUT:
    case SUCCESS_KAKAO_LOGOUT:
    case SUCCESS_NAVER_LOGOUT:
      return {
        requestLogout: false,
        successLogout: true,
        failLogout: false,
      };
    case FAIL_GOOGLE_LOGOUT:
    case FAIL_KAKAO_LOGOUT:
    case FAIL_NAVER_LOGOUT:
      return {
        requestLogout: false,
        successLogout: false,
        failLogout: true,
      };
    default:
      return state;
  }
}
export default userReducers;
