import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const FreeComment = ({ comment }) => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={comment.user.img}>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={comment.user.name}
            secondary={<>{comment.content}</>}
          />
          <div />
          {userInfo?.id === comment.user.userId ? (
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon color="action" />
              </IconButton>
            </ListItemSecondaryAction>
          ) : (
            <></>
          )}
        </ListItem>
      </List>
    </>
  );
};
export default FreeComment;
