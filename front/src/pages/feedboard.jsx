import React from 'react';
import AppLayout from 'components/common/AppLayout';
import FreePost from 'components/feedboard/FeedPost';

const FeedBoard = () => (
  <>
    <AppLayout>
      <h1>FeedBoard</h1>
      <FreePost />
    </AppLayout>
  </>
);
export default FeedBoard;
