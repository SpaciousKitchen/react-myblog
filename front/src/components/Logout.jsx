import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  REQUEST_GOOGLE_LOGOUT,
  REQUEST_KAKAO_LOGOUT,
} from '../modules/actions.js';

const Logout = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const onClickLogout = () => {
    switch (userInfo.option) {
      case 'KAKAO': {
        Kakao.API.request({
          url: '/v1/user/unlink',
          success(response) {
            console.log(response);
            dispatch({ type: REQUEST_KAKAO_LOGOUT });
          },
          fail(error) {
            console.log(error);
          },
        });
        break;
      }

      case 'GOOGLE': {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          console.log('User signed out.');
          dispatch({ type: REQUEST_GOOGLE_LOGOUT });
        });
        break;
      }

      case 'NAVER':
        break;

      default:
        break;
    }
  };
  return (
    <>
      <button type="button" style={{ float: 'right' }} onClick={onClickLogout}>
        {userInfo.name}
      </button>
    </>
  );
};

export default Logout;
