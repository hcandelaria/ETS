import React  from 'react';
import {BrowserRouter as Router, Route, Switch, IndexRoute, Link} from 'react-router-dom';
 import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import SettingsPage from './containers/SettingsPage.jsx';
import EmailPage from './containers/EmailPage.jsx';
import ApplicantPage from './containers/ApplicantPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import PageNotfound from './containers/PageNotfound.jsx';
import SchedulerPage from './containers/SchedulerPage.jsx';
import { connect } from 'react-redux';

@connect((store)=>{
  return{
    auth: store.settings.authenticated,
    location: store.router.location.pathname,
    _id: store.users._id,
    user: store.users.user,
    login: store.users.login,
  }
})
export default class Navbar extends React.Component{
  componentDidMount(){
  }
  render(){
    return(
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/dashboard" component={EmailPage}/>
          <Route exact path="/settings" component={SettingsPage}/>
          <Route exact path="/interviews" component={ApplicantPage}/>
          <Route exact path="/interviews/:storeId/:interviewerId" component={SchedulerPage}/>
          <Route component={PageNotfound}/>
        </Switch>
    )
  }
}
