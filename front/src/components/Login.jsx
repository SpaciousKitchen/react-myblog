import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import { ButtonGroup } from '@material-ui/core';
import {useSelector,useDispatch}from 'react-redux';

import {REQUESET_LOGIN} from '../modules/actions.js';
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

const Login = () => {

  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onClickNaverLogin=()=>{
    dispatch({type:REQUESET_LOGIN,})

  }

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
              style={{ background: '#3b5998', border: 'none' }}
              startIcon={<FacebookIcon style={{ fontSize: '32' }} />}
            >
              페이스북 로그인
            </Button>
            <br />
            <Button
              style={{ background: '#F7E600', border: 'none' }}
              startIcon={<img src="../../public/kakaotalk_logo.png" />}
            >
              카카오톡 로그인
            </Button>
            <br />
            <Button
              style={{ background: '#FFFFFFFFF', border: 'none' }}
              startIcon={<img src="../../public/google_lo.png" />}
            >
              구글 로그인
            </Button>
          </ButtonGroup>
        </ContainLogin>
      </Overlay>
    </>
  );
};
export default Login;
