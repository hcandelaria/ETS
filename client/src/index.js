/*
  IMPORT
*/
// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//  Redux
import { applyMiddleware, createStore } from 'redux';
import { ConnectedRouter as Router, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';
//  Middleware
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
// History
import createHistory from 'history/createBrowserHistory';
//  Reducers
import reducer from './reducers';
//  App
import App from './App';
/*
  IMPORT
*/

//  Logger settings
const logger = createLogger({
  collapsed: true,
});

// Create history
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

//  Create middleware
const middleware = applyMiddleware(promise(), historyMiddleware, logger, thunk);

//create store
const store = createStore(reducer, composeWithDevTools(middleware));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App />
      </div>
    </ Router>
  </ Provider>
), document.getElementById('react-app'));
