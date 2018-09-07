import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Switch,
  FormGroup,
  FormControlLabel,
  TextField,
  FormLabel,
  Typography
} from '@material-ui/core/';

const styles = {
  button: {
    margin: '0px 5px'
  },
  title: {
    color: '#FFFFFF'
  },
  label: {
    marginRight: 30,
    width: 100,
  },
  constainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}
const Settings = ({
  groupInterviews,
  weekendsInterviews,
  timesAvailable,
  handleSwitch,
  user,
}) => (<Card className="container">
  <h2 className="card-heading" style={styles.title}>Settings</h2>
  <Typography variant="title" gutterBottom>
    Interviews
  </Typography>
  <form>
    <FormControlLabel control={<Switch
      checked = {
        groupInterviews
      }
      onChange = {
        handleSwitch
      }
      value = "groupInterviews"
      color = "primary"
      />} label="Group interviews"/>
    <FormControlLabel  control={<Switch
      disabled
      checked = {
        weekendsInterviews
      }
      onChange = {
        handleSwitch
      }
      value = "weekendsInterviews"
      color = "primary"
    />} label="Weekend interviews"/>
  </form>
  <FormGroup row>
    <FormLabel style={styles.label}>From:</FormLabel>
    {
      timesAvailable.map(a => {
        if(a.available){
          return (
            <TextField key={a.id} id="time" label={a.day} type="time" defaultValue={a.from} InputLabelProps={{
                shrink: true
              }} inputProps={{
                // step: 300, 5 min
                step: a.step
              }}/>
          )
        }
      })
    }
  </FormGroup>
  <br/>
  <FormGroup row>
    <FormLabel style={styles.label}>To:</FormLabel>
    {
      timesAvailable.map(a => {
        if(a.available){
          return (
            <TextField key={a.id} id="time" label={a.day} type="time" defaultValue={a.to} InputLabelProps={{
                shrink: true
              }} inputProps={{
                // step: 300, 5 min
                step: a.step
              }}/>
          )
        }
      })
    }
  </FormGroup>
  <br/>
  <Typography variant="title" gutterBottom>
    Account
  </Typography>
  <div style={styles.container}>
    <TextField
      label="Store"
      id="margin-none"
      defaultValue={user.store}
      // helperText="Some important text"
    />
  </div>
</Card>);

Settings.propTypes = {
  groupInterviews: PropTypes.bool.isRequired,
  weekendsInterviews: PropTypes.bool.isRequired,
  timesAvailable: PropTypes.array.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Settings;
