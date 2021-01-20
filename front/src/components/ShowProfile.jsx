import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AccountEmailStyle,
  ImgStyle,
  PopoverStyle,
  ProfileImageStyle,
  LogoutButtonStyle,
} from '../Styles/style';
import {
  REQUEST_GOOGLE_LOGOUT,
  REQUEST_KAKAO_LOGOUT,
} from '../modules/actions.js';

const ShowUserProfile = () => {
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
      <PopoverStyle>
        <div style={{ margin: 'auto' }}>
          <strong>{userInfo.name}</strong>
          <span style={{ fontSize: ' 14px' }}> 님, 안녕하세요</span>
        </div>
        <ProfileImageStyle style={{ marginLeft: '40%' }}>
          <ImgStyle
            src={userInfo.img}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ProfileImageStyle>

        <AccountEmailStyle>
          <img
            src={userInfo.logoUrl}
            style={{ width: '15px', height: '15px', objectFit: 'cover' }}
          />

          {userInfo.eamil}
        </AccountEmailStyle>
        <LogoutButtonStyle onClick={onClickLogout}>로그아웃</LogoutButtonStyle>
      </PopoverStyle>
    </>
  );
};

export default ShowUserProfile;
