import React from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Main from './main/Main';
import Breaks from './breaks/Breaks';
import WhiteOut from './whiteout/WhiteOut';

export default (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/eyebreak" component={Breaks} />
      <Route path="/whiteout" component={WhiteOut} />
    </Switch>
  </HashRouter>
);
