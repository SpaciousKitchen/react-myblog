import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Divider from '@material-ui/core/Divider';
import { Avatar } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

const PostContent = ({ post }) => {
  const onClickHeart = () => {};
  const onClickCommend = () => {
    console.log('clickCommend');
  };
  return (
    <>
      <div style={{ padding: '50px' }}>
        <div style={{ padding: '0px 30px' }}>
          <h1>{post.subject}</h1>
        </div>

        <Divider variant="middle" />
        <div style={{ padding: '10px 30px' }}>
          {/* <ImgStyle src={post.user.img} /> */}
          <Avatar
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
            style={{ display: 'inline-flex' }}
          />
          <span style={{ marginLeft: '10px' }}>{post.user.name}</span>

          <span style={{ float: 'right' }}> 2017.02.08</span>
        </div>

        <Divider variant="middle" />
        <div style={{ padding: '0px 20px' }}>
          <h3>{post.name}</h3>
          <div>{ReactHtmlParser(post.content)}</div>
        </div>
        <Divider variant="middle" />
        <div style={{ padding: '10px 20px' }}>
          <FavoriteBorderIcon color="action" onClick={onClickHeart} />
          <SmsOutlinedIcon color="action" onClick={onClickCommend} />
        </div>
      </div>
    </>
  );
};
export default PostContent;
