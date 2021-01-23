import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { ButtonGroup } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import * as config from '../../config';

import {
  FAIL_KAKAO_LOGIN,
  REQUEST_GOOGLE_LOGIN,
  REQUEST_KAKAO_LOGIN,
  SUCCESS_KAKAO_LOGIN,
} from '../modules/actions.js';

axios.defaults.baseURL = 'http://localhost:3000/';

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
  const [loginData, setLogtinData] = useState('');

  const dispatch = useDispatch();
  const { requestLogin } = useSelector((state) => state.user);
  useEffect(() => {
    if (requestLogin) {
      axios
        .post('/user/login', loginData)
        .then((res) => {
          console.log(res);
          dispatch({
            type: SUCCESS_KAKAO_LOGIN,
            data: res.data,
          });
          setLoginVisible((pre) => !pre);
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: FAIL_KAKAO_LOGIN,
            data: error,
          });
        });
    }
  }, [requestLogin]);

  const onClickNaverLogin = () => {};

  const onClickKaKaoLogin = async () => {
    Kakao.init(config.REACT_APP_KAKAO_CLIENT_ID);
    Kakao.isInitialized();
    Kakao.Auth.login({
      success(authObj) {
        Kakao.Auth.setAccessToken(authObj.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success(response) {
            setLogtinData({
              loginId: response.id,
              name: response.properties.nickname,
              email: response.kakao_account.email,
              img: response.properties.thumbnail_image,
              logoUrl: '../../public/kakaotalk_logo.png',
              option: 'KAKAO',
            });
            dispatch({
              type: REQUEST_KAKAO_LOGIN,
            });
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

  const onClickGoogleLogin = (response) => {
    console.log(response);
    setLogtinData({
      loginId: response.googleId,
      name: response.profileObj.name,
      img: response.profileObj.imageUrl,
      email: response.profileObj.email,
      logoUrl: '../../public/google_lo.png',
      option: 'GOOGLE',
    });
    dispatch({
      type: REQUEST_GOOGLE_LOGIN,
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
