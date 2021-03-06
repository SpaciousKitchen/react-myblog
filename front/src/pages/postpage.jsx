import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AppLayout from 'components/common/AppLayout';
import PostContent from 'components/freeboard/PostContent';

const PostPage = () => {
  const { posts } = useSelector((state) => state.freeboard);
  const { id } = useParams();
  const post = posts.find((element) => element.id === parseInt(id, 10));

  return (
    <AppLayout>
      <PostContent post={post} />
    </AppLayout>
  );
};
export default PostPage;
