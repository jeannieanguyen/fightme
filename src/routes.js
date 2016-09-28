import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import HomePage from './pages/home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/home" component={HomePage} />
    </Route>
);
