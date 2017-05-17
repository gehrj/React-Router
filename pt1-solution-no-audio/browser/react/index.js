import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Album from './components/Album';
import Albums from './components/Albums';
import Artist from './components/Artist';
import Artists from './components/Artists';
import Songs from './components/Songs';
import FourohFour from './components/notFound';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <Route path='/albums' component={Albums} />
      <Route path='/albums/:albumId' component={Album} />
      <Route path='/artists' component={Artists} />
      <Route path='/artists/:artistId' component={Artist}>
        <Route path='albums' component={Albums}/>
        <Route path='songs' component={Songs}/>
      </Route>
      <Route path='/artists/:artistId/albums' component={Albums} />
      {/* <Route path='/artists/:artistId/songs' component={Songs} /> */}
      <IndexRedirect to='/albums' />
      <Route path='/notFound' component={FourohFour} />
      <Redirect from='*' to='/notFound' />
    </Route>
  </Router>,
  document.getElementById('app')
);
