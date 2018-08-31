import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Auth from '../modules/Auth';

const Logout = ({ secretData }) => (
  <Card className="container">
    {Auth.deauthenticateUser()}
    <CardTitle title="logout"/>
      <CardText style={{ fontSize: '16px', color: 'green' }}>You're logged out :D !!!</CardText>
  </Card>
);

Logout.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Logout;
