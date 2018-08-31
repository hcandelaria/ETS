import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const styles = {
  button:{
    margin: '0px 5px',
  },
}
const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
}) => (
  <Card className="container">
    <form  onSubmit={onSubmit} autoComplete="off">
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message center">{successMessage}</p>}
      {errors.summary && <p className="error-message center">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          label="Email"
          name="email"
          error={errors.email}
          onChange={onChange}
        />
      </div>

      <div className="field-line">
        <TextField
          label="Password"
          type="password"
          name="password"
          error={errors.password}
          onChange={onChange}
        />
      </div>

      <div className="button-line">
        <Button type="submit" onSubmit={onSubmit} style={styles.button} variant="contained" color="primary">
          Log in
        </Button>
        <Button type="submit" style={styles.button} variant="contained" color="primary">
          Gmail
        </Button>
      </div>

      <CardContent>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardContent>
    </form>
  </Card>
);
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
