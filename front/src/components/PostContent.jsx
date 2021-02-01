import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const PostContent = ({ post }) => (
  <>
    <h2>{post.subject}</h2>
    <h3>{post.name}</h3>
    <div>{ReactHtmlParser(post.content)}</div>
  </>
);
export default PostContent;
