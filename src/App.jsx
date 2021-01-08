import React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Menu from './Components/Menu';
import Main from './Pages/main';
import FreeBoard from './Pages/freeboard';
import FeedBoard from './Pages/feedboard';
import Study from './Pages/study';

const App = () => (
  <>
    <Router>
      <Menu />
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/freeboard" component={FreeBoard} />
        <Route path="/feedboard" component={FeedBoard} />
        <Route path="/study" component={Study} />
      </Switch>
    </Router>
  </>
);
export default App;
