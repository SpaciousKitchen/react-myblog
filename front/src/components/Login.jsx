import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { ButtonGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import * as config from '../../config';

import {
  REQUEST_GOOGLE_LOGIN,
  REQUEST_KAKAO_LOGIN,
} from '../modules/actions.js';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContainLogin = styled.div`
  padding: 20px;
  background: #ffffffff;
  display: flex;
  flex: 0.5;
  height: 500px;
  border-radius: 0.28571429rem;
  flex-direction: column;
`;
const Login = ({ setLoginVisible }) => {
  const dispatch = useDispatch();

  const onClickNaverLogin = () => {
    // dispatch({ type: });
  };

  const onClickKAKAOLogin = async () => {
    Kakao.init(config.REACT_APP_KAKAO_CLIENT_ID);
    Kakao.isInitialized();
    Kakao.Auth.login({
      success(authObj) {
        Kakao.Auth.setAccessToken(authObj.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success(response) {
            console.log(response);
            dispatch({
              type: REQUEST_KAKAO_LOGIN,
              data: {
                id: response.id,
                name: response.properties.nickname,
                email: response.kakao_account.email,
                img: response.properties.thumbnail_image,
                logoUrl: '../../public/kakaotalk_logo.png',
                option: 'KAKAO',
              },
            });
            setLoginVisible((pre) => !pre);
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(err) {
        alert(JSON.stringify(err));
      },
    });
  };

  const responseGoogle = (response) => {
    setLoginVisible(false);
    console.log(response);
    dispatch({
      type: REQUEST_GOOGLE_LOGIN,
      data: {
        id: response.googleId,
        name: response.profileObj.name,
        img: response.profileObj.imageUrl,
        email: response.profileObj.email,
        logoUrl: '../../public/google_lo.png',
        option: 'GOOGLE',
      },
    });
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
              KakaoLogin
              onClick={onClickKAKAOLogin}
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
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
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
