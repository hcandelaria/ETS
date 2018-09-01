/*
  IMPORT
*/
// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerMiddleware, push } from 'react-router-redux';

//  App
import App from './App';
import { store } from './modules/store.js';
import { history } from './modules/store.js';
/*
  IMPORT
*/




ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App/>
      </div>
    </Router>
  </Provider>
), document.getElementById('react-app'));
