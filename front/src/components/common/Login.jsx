import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { ButtonGroup } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';

import { Overlay, ContainLogin } from 'styles/style';
import { fetchUserLogin } from 'reducers/user';
import * as config from '../../../config';

const Login = ({ setLoginVisible }) => {
  const dispatch = useDispatch();
  const { error, done } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (done === 'Loginfulfilled') {
      setLoginVisible((pre) => !pre);
    }
  }, [done]);

  const onClickNaverLogin = () => {
    dispatch(fetchUserLogin());
  };

  const onClickKaKaoLogin = async () => {
    Kakao.Auth.login({
      success(authObj) {
        Kakao.Auth.setAccessToken(authObj.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success(response) {
            dispatch(
              fetchUserLogin({
                loginId: response.id,
                name: response.properties.nickname,
                email: response.kakao_account.email,
                img: response.properties.thumbnail_image,
                logoUrl: '../../public/kakaotalk_logo.png',
                option: 'KAKAO',
              }),
            );
          },
          fail(err) {
            alert(err?.response?.message);
          },
        });
      },
      fail(err) {
        alert(JSON.stringify(err));
      },
    });
  };

  const onClickGoogleLogin = (response) => {
    dispatch(
      fetchUserLogin({
        loginId: response.googleId,
        name: response.profileObj.name,
        img: response.profileObj.imageUrl,
        email: response.profileObj.email,
        logoUrl: '../../public/google_lo.png',
        option: 'GOOGLE',
      }),
    );
  };

  return (
    <>
      <Overlay>
        <ContainLogin>
          <span>간편하게 로그인하세요 !</span>
          <ButtonGroup
            style={{ padding: '10px' }}
            orientation="vertical"
            size="medium"
          >
            <Button
              style={{ background: '#2DB400', border: 'none' }}
              startIcon={<img src="../../public/naver_logo.png" />}
              onClick={onClickNaverLogin}
            >
              네이버 로그인
            </Button>
            <br />
            <Button
              KaKaoLogin
              onClick={onClickKaKaoLogin}
              style={{ background: '#F7E600', border: 'none' }}
              startIcon={<img src="../../public/kakaotalk_logo.png" />}
            >
              카카오톡 로그인
            </Button>
            <br />
            <GoogleLogin
              clientId={config.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  startIcon={<img src="../../public/google_lo.png" />}
                >
                  구글 로그인
                </Button>
              )}
              buttonText="Login"
              onSuccess={onClickGoogleLogin}
              onFailure={onClickGoogleLogin}
              cookiePolicy="single_host_origin"
            />
            ,
          </ButtonGroup>
        </ContainLogin>
      </Overlay>
    </>
  );
};
Login.prototype = {
  setLoginVisible: PropTypes.func,
};
export default Login;
