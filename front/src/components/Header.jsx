import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

import { useStyles } from '../Styles/style';

const Header = ({ setLoginVisible }) => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.user);
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
        <UserProfile />
      )}
    </>
  );
};
Header.propTypes = {
  setLoginVisible: PropTypes.func,
};

export default Header;
