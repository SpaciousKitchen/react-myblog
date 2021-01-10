import React from 'react';

import {Provider} from 'react-redux';
import { Route, BrowserRouter as Router} from 'react-router-dom';

import Menu from './Components/MenuLayout';
import Main from './Pages/main';
import FreeBoard from './Pages/freeboard';
import FeedBoard from './Pages/feedboard';
import Study from './Pages/study';
import rootReducer from './modules';
import {createStore}from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const store=createStore(rootReducer, composeWithDevTools()); 
//composeWithDevTools()데브 툴스와 연결
const App = () => (
  <>
  <Provider store={store} >
  <Router>
      <Menu />
      <Route exact path="/" component={Main} />
      <Route path="/freeboard" component={FreeBoard} />
      <Route path="/feedboard" component={FeedBoard} />
      <Route path="/study" component={Study} />
    </Router>

  </Provider>
  
  </>
);
export default App;
