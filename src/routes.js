import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import HomePage from './pages/home';
import SocketPage from './pages/socket'; 
import LoginPage from 'views/pages/login';
import HelloWorldPage from 'views/pages/hello_world';
import { withAuthentication } from 'views/enhancers';

let authenticatedHelloWorldPage = withAuthentication(HelloWorldPage);

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/socket" component={SocketPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/hello_world" component={authenticatedHelloWorldPage} />
    </Route>
);
