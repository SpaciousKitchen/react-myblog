import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'store/configureStore.js';
import Main from './pages/main';
import FreeBoard from './pages/freeboard';
import FeedBoard from './pages/feedboard';
import Study from './pages/study';
import WriteFreeBoard from './pages/writeFreeBoard';
import PostPage from './pages/postpage';
import * as config from '../config';

Kakao.init(config.REACT_APP_KAKAO_CLIENT_ID);
Kakao.isInitialized();

const App = () => (
  <>
    <Provider store={configureStore()}>
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/freeboard" component={FreeBoard} />
        <Route path="/freecontent/:id" component={PostPage} />
        <Route path="/feedboard" component={FeedBoard} />
        <Route path="/study" component={Study} />
        <Route path="/write" component={WriteFreeBoard} />
      </Router>
    </Provider>
  </>
);
export default App;
