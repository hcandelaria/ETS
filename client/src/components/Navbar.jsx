import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Auth from '../modules/Auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import Typography from '@material-ui/core/Typography';

const appBarTitleStyle={
  textAlign: "left"
}
const styles = {
  link: {
    margin: '10px',
    color: '#000000',
    ':hover': {
      background: '#FFFFFF'
    }
  },
  button: {
    margin: '5px',
  }
}

@connect((store)=>{
  return{
    auth: store.settings.authenticated
  }
})
export default class Navbar extends React.Component{
  signIn(){

  }
  signOut(){
    this.props.dispatch({type: 'UPDATE_AUTHENTICATED'});
    Auth.deauthenticateUser();
    this.props.dispatch(push('/'));
  }
  render(){
    return(
      <AppBar
        position="static">
        <Typography variant="display2" gutterBottom>
          <Link to='/' style={styles.link}>EXPRESS</Link>
        {
          this.props.auth ?
          (
            <div>
              <div className="top-bar-right">
                <Button variant="contained" color="secondary" onSubmit={this.signOut}>
                  SIGN OUT
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/dashboard">
                  Dashboard
                </Button>
              </div>
            </div>
          ):(
            <div className="top-bar-right">
              <div>
                <div className="top-bar-right">
                  <Button variant="contained" style={styles.button} color="secondary" component={Link} to="/">
                    LOGIN
                  </Button>
                  <Button variant="contained" style={styles.button} color="secondary" component={Link} to="/signup">
                    SIGN UP
                  </Button>
                </div>
              </div>
            </div>
          )
        }
      </Typography>
      </AppBar>
    )
  }
}
