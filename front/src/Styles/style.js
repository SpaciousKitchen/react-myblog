import styled, { createGlobalStyle } from 'styled-components';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  loginbutton: {
    float: 'right',
    marginTop: '5px',
    marginRight: '20px',
    background: '#ffffffff',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
  },
  span: {
    color: 'rgba(0, 0, 0, 0.54);',
    fontSize: '14px',
  },
  sideBar: {
    position: 'absolute',
    width: '55px',
    height: '100%',
    backgroundColor: '#CCCCCCCC',
  },
}));

export const PopoverStyle = styled.div`
  z-index: 5000;
  position: absolute;
  width: 250px;
  top: 25px;
  right: 10px;
  height: 200px;
  background: #cccccccc;
  display: flex;
  flex-direction: column;
`;
export const ProfileImageStyle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;
`;

export const AccountEmailStyle = styled.span`
  margin-top: 2%;
  margin-left: 24%;
  font-size: 2px;
  color: rgba(0, 0, 0, 0.54);
`;
export const LogoutButtonStyle = styled.button`
  margin-top: 10%;
  border: none;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.54);
`;

export const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GlobalStyle = createGlobalStyle`
.editor-class{
  height:500px;
  @media only screen and (max-width: 768px) {
      height:300px;
   }
}
`;

export const WriteContainer = styled.div`
  border: 1px solid #f1f1f1;
  padding: 10px;
  margin-top: 5px;
`;
export const InputStyled = styled.input`
  border: 1px solid #f1f1f1;
  height: 34px;
  width: 50%;
  border-radius: 3px;
  font-size: 1rem;
  color: #5f5f5f;
  box-shadow: none;
`;

export const ButtonSstyled = styled.button`
  margin-top: 5px;

  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: 1px solid #f1f1f1;
  color: rgba(0, 0, 0, 0.54);
  height: 34px;

  border-radius: 4px;
  padding: 0px 1.25rem;
`;
export const Overlay = styled.div`
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
export const ContainLogin = styled.div`
  padding: 20px;
  background: #ffffffff;
  display: flex;
  flex: 0.5;
  height: 500px;
  border-radius: 0.28571429rem;
  flex-direction: column;
`;
