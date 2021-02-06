import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { fetchAddComment } from 'reducers/freeboard.js';
import { CommentTextArea, CommentSubmitButton } from 'styles/style';

const AddFreeComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const onSubmit = (e) => {
    dispatch(fetchAddComment(postId, commentText));
    e.preventDefault();
  };
  const onChangeCommentText = (e) => {
    setCommentText(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <CommentTextArea
          value={commentText}
          placeholder="내용을 입력하세요..."
          onChange={onChangeCommentText}
        />
        <CommentSubmitButton type="submit">게시</CommentSubmitButton>
      </form>
      <Divider variant="middle" />
    </>
  );
};
export default AddFreeComment;
