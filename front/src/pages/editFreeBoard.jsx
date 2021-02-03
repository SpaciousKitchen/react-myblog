import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AppLayout from 'components/common/AppLayout';
import EditFreePost from 'components/freeboard/EditFreePost';

const EditPage = () => {
  const { posts } = useSelector((state) => state.freeboard);
  const { id } = useParams();
  console.log(id);
  const post = posts.find((element) => element.id === parseInt(id, 10));

  return (
    <AppLayout>
      <EditFreePost post={post} />
    </AppLayout>
  );
};
export default EditPage;
