import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers, { rootEpic } from 'ducks/index';
import * as AWS from 'api/aws';
import routes from 'routes';
import promise from 'redux-promise';

// enable redux-devtools-extension (chrome)
// https://github.com/zalmoxisus/redux-devtools-extension
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const apigClient = apigClientFactory.newClient();
const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
    AWS,
    apigClient,
  },
});
const enhancer = composeEnhancers(
  applyMiddleware(epicMiddleware,
    thunk,
    promise,
    routerMiddleware(browserHistory)),
);
const store = createStore(reducers, enhancer);

const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

// renders the app inside the root element.
let render = (approutes, revision) => {
  ReactDOM.render(
    <Provider store={store} key={revision}>
      <Router
        onUpdate={() => window.scrollTo(0, 0)}
        history={history}
      >
        {approutes}
      </Router>
    </Provider>,
    rootEl,
  );
};

// this entire section is applied only during development.
if (module.hot) {
  // use redbox to render error details whenever an error is thrown
  // inside any render method.
  const renderApp = render;
  const renderError = (err) => {
    /* eslint-disable global-require */
    const RedBox = require('redbox-react');
    /* eslint-enable */
    ReactDOM.render(<RedBox error={err} />, rootEl);
  };
  render = (approutes, revision) => {
    try {
      renderApp(approutes, revision);
    } catch (err) {
      renderError(err);
    }
  };

  // unique key for each hot reload (always 0 in production). this is
  // used as a unique key so that Router is completely re-built whenever
  // there are changes.
  let revision = 1;

  // when any component referenced in a route is changed, reload
  // all the routes without refreshing the page. the redux store
  // remains the same, so the session is preserved.
  module.hot.accept('./routes', () => {
    /* eslint-disable global-require */
    const approutes = require('./routes').default;
    /* eslint-enable */
    revision += 1;
    setTimeout(() => render(approutes, revision));
  });
}
render(routes, 0);
