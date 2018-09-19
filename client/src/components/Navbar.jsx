import React, {Component} from 'react';
import Auth from '../modules/Auth';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'


const styles = {
  link: {
    margin: '10px',
    color: '#000000',
    ':hover': {
      background: '#FFFFFF'
    }
  },
  button:{
    margin: '0px 10px',
  },
  flex: {
    flexGrow: 1
  },
}

@connect((store) => {
  return {
    location: store.router.location.pathname.split('/'),
    auth: store.settings.authenticated,
    menu: store.settings.menu,
  }
})
export default class Navbar extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    Auth.isUserAuthenticated()
      ? this.props.dispatch({type: 'UPDATE_AUTHENTICATED'})
      : console.log('Welcome Guess!');
  }
  toggleMenu() {
    this.props.dispatch({
      type: 'UPDATE_MENU'
    })
  };
  signIn() {}
  signOut() {
    this.props.dispatch({type: 'UPDATE_AUTHENTICATED'});
    this.props.dispatch(push('/'));
  }

  render() {
    return (<AppBar position="sticky">
      <Toolbar>

        <Typography variant="display2" color="inherit" style={styles.flex}>
          <Link to='/' style={styles.link}>EXPRESS</Link>
        </Typography>
        {
          this.props.auth
            ? (<div>
              <div className="top-bar-right">

                <Button variant="contained" style={styles.button} color="secondary" onClick={this.signOut}>
                  SIGN OUT
                </Button>
                <Button variant="contained" style={styles.button} color="secondary" onClick={this.toggleMenu}>
                  <Icon>menu</Icon>
                </Button>
              </div>
            </div>)
            : (
              (this.props.location[1] != 'store')
                ? (
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
                ) : (
                  <div></div>
                )
            )
        }
      </Toolbar>

    </AppBar>);
  }
}
