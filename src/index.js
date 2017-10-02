'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from 'ducks/index';
import routes from 'routes';
import promise from 'redux-promise';
import templateReducer from 'ducks/template/reducers';


const createStoreWithMiddleware = applyMiddleware(
    thunk,
    promise,
    routerMiddleware(browserHistory)
) (createStore);

const store = createStoreWithMiddleware(reducers);

const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

// renders the app inside the root element.
let render = (routes, revision) => ReactDOM.render(
    <Provider store={store} key={revision}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            {routes}
        </Router>
    </Provider>,
    rootEl
);

// this entire section is applied only during development.
if (module.hot) {
    // use redbox to render error details whenever an error is thrown
    // inside any render method.
    const renderApp = render;
    const renderError = err => {
        const RedBox = require('redbox-react');
        ReactDOM.render(<RedBox error={err} />, rootEl);
    };
    render = (routes, revision) => {
        try {
            renderApp(routes, revision);
        }
        catch (err) {
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
        const routes = require('./routes').default;
        setTimeout(() => render(routes, ++revision));
    });
}

const { pathname: path } = window.location;
render(routes, 0);
