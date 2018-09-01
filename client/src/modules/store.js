//  Redux
import { applyMiddleware, createStore } from 'redux';
import { ConnectedRouter as Router, routerMiddleware, push } from 'react-router-redux';
//  Middleware
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
// History
import createHistory from 'history/createBrowserHistory';
//  Reducers
import reducer from '../reducers';



//  Logger settings
const logger = createLogger({
  collapsed: true,
});

// Create history
export const history = createHistory();
const historyMiddleware = routerMiddleware(history);
//  Create middleware
const middleware = applyMiddleware(promise(), historyMiddleware, logger, thunk);

//create store
export const store = createStore(reducer, composeWithDevTools(middleware));
