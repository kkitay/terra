import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router';
import './index.css';
import Menubar from './menubar/Menubar';

ReactDOM.render(
  <MemoryRouter>
    <Route exact path="/" component={Menubar} />
  </MemoryRouter>
  , document.getElementById('root'));