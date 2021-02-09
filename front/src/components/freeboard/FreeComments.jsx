import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { fetchDeleteComment } from 'reducers/freeboard';
import EditFreeComment from './EditFreeComment';

const FreeComments = ({ postId, comment }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const onClickDeleteComment = () => {
    dispatch(fetchDeleteComment({ postId, commentId: comment.id }));
  };
  const onClickEidtComment = () => {
    setEditMode((pre) => !pre);
  };
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
            secondary={
              editMode ? (
                <EditFreeComment
                  commentData={{
                    postId,
                    inItComment: comment.content,
                    commentId: comment.id,
                  }}
                  setEditMode={setEditMode}
                />
              ) : (
                <>{comment.content}</>
              )
            }
          />
          <div />
          {userInfo?.id === comment.user.id && !editMode ? (
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <EditOutlinedIcon color="action" onClick={onClickEidtComment} />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteOutlineOutlinedIcon
                  color="action"
                  onClick={onClickDeleteComment}
                />
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
export default FreeComments;
