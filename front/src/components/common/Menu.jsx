import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuIcon from '@material-ui/icons/Menu';

import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import IconButton from '@material-ui/core/IconButton';

import { useHistory } from 'react-router-dom';
import { useStyles } from 'styles/style';

const Menu = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div className={classes.sideBar}>
        <IconButton style={{ marginRight: '20px' }}>
          <MenuIcon />
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
              <MenuBookIcon fontSize="big" />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </div>
    </>
  );
};
export default Menu;
