import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const useStyles = makeStyles(() => ({
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
}));

const Header = ({ setLoginVisible }) => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo);

  return (
    <>
      {userInfo == null ? (
        <Button
          style={{ zIndex: 10000 }}
          onClick={() => {
            setLoginVisible((pre) => !pre);
          }}
          className={classes.loginbutton}
          startIcon={<AccountCircleRoundedIcon />}
        >
          로그인
        </Button>
      ) : (
        <Logout />
      )}
    </>
  );
};
Header.propTypes = {
  setLoginVisible: PropTypes.func,
};

export default Header;
