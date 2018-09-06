import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';

const styles = {
  button:{
    margin: '0px 5px',
  },
  title:{
    color: '#FFFFFF'
  },
}
const Settings = ({

}) => (
  <Card className="container">
    <form  autoComplete="off">
      <h2 className="card-heading" style={styles.title}>Settings</h2>
    </form>
  </Card>
);
Settings.propTypes = {

};
export default Settings;
