import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Main from './main/Main';
import EyeBreak from './eyebreak/EyeBreak';

ReactDOM.render(
  <HashRouter>
   <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/eyebreak" component={EyeBreak} />
   </Switch>
  </HashRouter>
  , document.getElementById('root'));