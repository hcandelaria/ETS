//Import combineReducers
import { combineReducers } from 'redux';
//Import react-router-redux
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux';

//Import reducers to be exporter
import users from './usersReducers';
import applicants from './applicantsReducers';
import settings from './settingsReducers';

export default combineReducers({
  users,
  applicants,
  settings,
  router : routerReducer
})
