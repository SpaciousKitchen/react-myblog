import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { ImgStyle, ProfileImageStyle } from '../Styles/style';
import ShowProfile from './ShowProfile';
import { SUCCESS_LOGOUT, FAIL_LOGOUT } from '../../reducers/actions.js';

const UserProfile = () => {
  const { userInfo, requestLogout } = useSelector((state) => state.user);
  const [showUserProfile, setshowUserProfile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('logout_requeset', requestLogout);
    if (requestLogout) {
      axios
        .post('/user/logout')
        .then(() => {
          dispatch({ type: SUCCESS_LOGOUT });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: FAIL_LOGOUT });
        });
    }
  }, [requestLogout]);

  const onClickShowUserProfile = () => {
    setshowUserProfile((pre) => !pre);
  };
  return (
    <div style={{ float: 'right' }} onClick={onClickShowUserProfile}>
      <ProfileImageStyle>
        <ImgStyle src={userInfo?.img} />
      </ProfileImageStyle>

      {showUserProfile ? <ShowProfile /> : <></>}
    </div>
  );
};

export default UserProfile;
