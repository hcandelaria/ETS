import React  from 'react';
import {BrowserRouter as Router, Route, Switch, IndexRoute, Link} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import LogoutPage from './LogoutPage.jsx';
import AboutPage from './AboutPage.jsx';
import SettingsPage from './SettingsPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import PageNotfound from './PageNotfound.jsx';
import InterviewsPage from './InterviewsPage.jsx';
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
          <Route exact path="/dashboard" component={DashboardPage}/>
          <Route exact path="/logout" component={LogoutPage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/settings" component={SettingsPage}/>
          <Route exact path="/interviews" component={InterviewsPage}/>
          <Route exact path="/interviews/:storeId" component={InterviewsPage}/>
          <Route component={PageNotfound}/>
        </Switch>
    )
  }
}
