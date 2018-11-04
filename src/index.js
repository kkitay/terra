import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Main from './main/Main';
import Breaks from './breaks/Breaks';
import WhiteOut from './whiteout/WhiteOut';

ReactDOM.render(
  <HashRouter>
   <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/break" component={Breaks} />
      <Route path="/whiteout" component={WhiteOut} />
   </Switch>
  </HashRouter>
  , document.getElementById('root'));