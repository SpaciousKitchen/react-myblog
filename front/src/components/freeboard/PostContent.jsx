import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { Avatar } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import { useHistory } from 'react-router-dom';
import { fetchDeletePost } from 'reducers/freeboard.js';

const PostContent = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user);
  const onClickHeart = () => {};
  const onClickCommend = () => {
    console.log('clickCommend');
  };
  const onClickDeletePost = () => {
    const confirmResult = confirm('정말로 삭제하시겠습니까?');

    if (confirmResult) {
      dispatch(fetchDeletePost(post.id));
    }
    history.push('/freeboard');
  };
  return (
    <>
      <div style={{ padding: '50px' }}>
        <div style={{ padding: '0px 30px' }}>
          <h1>{post?.subject}</h1>
        </div>

        <Divider variant="middle" />
        <div style={{ padding: '10px 30px' }}>
          {/* <ImgStyle src={post.user.img} /> */}
          <Avatar
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
            style={{ display: 'inline-flex' }}
          />
          <span style={{ marginLeft: '10px' }}>{post.user?.name}</span>

          <span style={{ float: 'right' }}> 2017.02.08</span>
        </div>

        <Divider variant="middle" />
        <div style={{ padding: '0px 20px' }}>
          <h3>{post.name}</h3>
          <div>{ReactHtmlParser(post.content)}</div>
        </div>
        <Divider variant="middle" />
        <div style={{ padding: '10px 20px' }}>
          <FavoriteBorderIcon
            color="action"
            onClick={onClickHeart}
            style={{ cursor: 'pointer' }}
          />
          <SmsOutlinedIcon
            color="action"
            onClick={onClickCommend}
            style={{ cursor: 'pointer' }}
          />
          {userInfo.id === post.user?.id ? (
            <>
              <EditOutlinedIcon
                color="action"
                style={{ cursor: 'pointer', float: 'right' }}
              />
              <DeleteOutlineOutlinedIcon
                onClick={onClickDeletePost}
                color="action"
                style={{ cursor: 'pointer', float: 'right' }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default PostContent;
