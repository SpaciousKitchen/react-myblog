import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './Pages/main';
import FreeBoard from './Pages/freeboard';
import FeedBoard from './Pages/feedboard';
import Study from './Pages/study';
import WriteFreeBoard from './pages/writeFreeBoard';
import PostPage from './pages/postpage';
import configureStore from '../store/configureStore.js';

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
