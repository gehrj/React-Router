import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Album from './components/Album';
import Albums from './components/Albums';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <Route path='/albums/:albumId' component={Album} />
      <Route path='/albums' component={Albums} />
      <IndexRedirect to='/albums' />
    </Route>
  </Router>,
  document.getElementById('app')
);
