import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import { fetchUser, changeUser } from '../actions/usersActions'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const STYLES = {
  marginTop: {
    marginTop: '20px',
  },
};


@connect((store)=>{
  return{
    auth: store.settings.authenticated,
    successMessage: store.settings.successMessage,
    _id: store.users._id,
    errors: store.users.errors,
    user: store.users.user,
    location: store.router.location.pathname,
  }
})
export default class LoginPage extends React.Component {


  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // formData to send
    const EMAIL = encodeURIComponent(this.props.user.email);
    const PASSWORD = encodeURIComponent(this.props.user.password);
    const FORMDATA = `email=${EMAIL}&password=${PASSWORD}`;



    // Function is expected to return a promise
    Promise.resolve(this.props.dispatch(fetchUser(FORMDATA)))
      .then( () =>{
        this.props.dispatch(push('/dashboard'));
      })
      .catch( (err) =>{
        console.log('LoginPage error: ', err);
      })

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    event.preventDefault();
    this.props.dispatch(changeUser(event, this.props.user))
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    if(Auth.getToken()!== null){
      this.props.dispatch(push('/dashboard'))
    }
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <div style={STYLES.marginTop}>
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.props.errors}
          successMessage={this.props.successMessage}
          user={this.props.user}
        />
      </div>
    );
  }

}
