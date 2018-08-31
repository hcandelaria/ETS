import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { changeUser, createUser } from '../actions/usersActions'

import SignUpForm from '../components/SignUpForm.jsx';

@connect((store)=>{
  return{
    errors: store.users.errors,
    user: store.users.user,
    location: store.router.location.pathname,
    message: store.users.message,
  }
})
export default class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);


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

    // create a string for an HTTP body message
    const store = encodeURIComponent(this.props.user.store);
    const email = encodeURIComponent(this.props.user.email);
    const password = encodeURIComponent(this.props.user.password);
    const formData = `store=${store}&email=${email}&password=${password}`;

    Promise.resolve(this.props.dispatch(createUser(formData)))
      .then( () =>{

        //Clear LoginForm
        this.props.dispatch({
          type:"UPDATE_USER",
          payload: {}
        })

      }).catch( (err) =>{
        console.log('SignUpPage error: ', err);
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
   * Render the component.
   */
  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.props.errors}
          user={this.props.user}
          message={this.props.message}
        />
      </div>
    );
  }

}
