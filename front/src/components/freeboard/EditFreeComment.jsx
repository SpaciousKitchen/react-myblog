import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { fetchEditComment } from 'reducers/freeboard.js';
import { CommentTextArea, CommentSubmitButton } from 'styles/style';

const EditFreeComment = ({ commentData, setEditMode }) => {
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState(commentData.inItComment);
  const onSubmit = (e) => {
    dispatch(
      fetchEditComment({
        postId: commentData.postId,
        commentId: commentData.commentId,
        content: commentText,
      }),
    );
    setEditMode((pre) => !pre);
    e.preventDefault();
  };
  const onChangeComment = (e) => {
    setCommentText(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <CommentTextArea value={commentText} onChange={onChangeComment} />
        <CommentSubmitButton type="submit">변경</CommentSubmitButton>
      </form>
      <Divider variant="middle" />
    </>
  );
};
export default EditFreeComment;
