import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { withAuthentication } from 'views/enhancers';
import LoginPage from 'views/pages/login/login';
import RegisterPage from 'views/pages/login/index';
import HelloWorldPage from 'views/pages/hello_world';
import App from './app';

const authenticatedHelloWorldPage = withAuthentication(HelloWorldPage);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/hello_world" component={authenticatedHelloWorldPage} />
  </Route>
);
