import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MatchPage from 'views/pages/match';
import App from './app';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MatchPage} />
  </Route>
);
