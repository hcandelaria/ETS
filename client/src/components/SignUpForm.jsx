import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  message,
}) => (
  <Card className="container">
    <form  onSubmit={onSubmit} autoComplete="off">
      <h2 className="card-heading">Sign Up</h2>
      {
        message &&
        <p className="success-message center"> {message}</p>
      }
      {
        errors.response &&
        <p className="error-message center"> {errors.response.data.message}</p>
      }
      {
        errors.response &&
        <p className="error-message center">{errors.response.data.errors.store}</p>
      }
      <div className="field-line">
        <TextField
          label="Store"
          name="store"
          error={(errors.response && errors.response.data.errors.store)}
          onChange={onChange}
          value={user.store}
        />
      </div>
      {
        errors.response &&
        <p className="error-message center">{errors.response.data.errors.email}</p>
      }
      <div className="field-line">
        <TextField
          label="Email"
          name="email"
          error={(errors.response && errors.response.data.errors.email)}
          onChange={onChange}
          value={user.email}
        />
      </div>
      {
        errors.response &&
        <p className="error-message center">{errors.response.data.errors.password}</p>
      }
      <div className="field-line">
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={onChange}
          error={(errors.response && errors.response.data.errors.password)}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <Button type="submit" variant="contained" color="primary">
          Create New Account
        </Button>
      </div>

      <CardContent>Already have an account? <Link to={'/'}>Log in</Link></CardContent>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
};

export default SignUpForm;
