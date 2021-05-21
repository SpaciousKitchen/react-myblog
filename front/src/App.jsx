import React, { useEffect } from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchLoadUserInfo } from 'reducers/user';
import Main from './pages/main';
import FreeBoard from './pages/freeboard';
import FeedBoard from './pages/feedboard';
import Study from './pages/study';
import WriteBoard from './pages/writeBoard';
import EditFreeBoard from './pages/editFreeBoard';
import PostPage from './pages/postpage';
import * as config from '../config';
import './App.css';

Kakao.init(config.REACT_APP_KAKAO_CLIENT_ID);
Kakao.isInitialized();
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
        <Route path="/write/:postname" component={WriteBoard} />
        <Route path="/editcontent/:id" component={EditFreeBoard} />
      </Router>
    </>
  );
};
export default App;
