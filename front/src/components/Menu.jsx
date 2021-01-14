import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  sideBar: {
    position: 'absolute',
    width: '55px',
    height: '100%',
    backgroundColor: '#CCCCCCCC',
  },
}));

const Menu = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div className={classes.sideBar}>
        <IconButton style={{ marginRight: '20px' }}>
          <MenuRoundedIcon />
        </IconButton>
        <MenuList>
          <MenuItem
            onClick={() => history.push('/')}
            style={{ marginTop: '120px' }}
          >
            <ListItemIcon>
              <HomeRoundedIcon fontSize="big" />
            </ListItemIcon>
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/freeboard');
            }}
          >
            <ListItemIcon>
              <AssignmentRoundedIcon fontSize="big" />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={() => history.push('/feedboard')}>
            <ListItemIcon>
              <SupervisorAccountRoundedIcon fontSize="big" />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={() => history.push('/study')}>
            <ListItemIcon>
              <MenuBookRoundedIcon fontSize="big" />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </div>
    </>
  );
};
export default Menu;
