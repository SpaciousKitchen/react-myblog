import React, { useEffect } from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchLoadPosts } from 'reducers/freeboard';
import { fetchLoadUserInfo } from 'reducers/user';
import Main from './pages/main';
import FreeBoard from './pages/freeboard';
import FeedBoard from './pages/feedboard';
import Study from './pages/study';
import WriteFreeBoard from './pages/writeFreeBoard';
import PostPage from './pages/postpage';
import * as config from '../config';

Kakao.init(config.REACT_APP_KAKAO_CLIENT_ID);
Kakao.isInitialized();
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoadPosts());
    dispatch(fetchLoadUserInfo());
  }, []);

  return (
    <>
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/freeboard" component={FreeBoard} />
        <Route path="/freecontent/:id" component={PostPage} />
        <Route path="/feedboard" component={FeedBoard} />
        <Route path="/study" component={Study} />
        <Route path="/write" component={WriteFreeBoard} />
      </Router>
    </>
  );
};
export default App;
