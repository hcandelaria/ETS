import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Switch,
  FormGroup,
  FormControlLabel,
  TextField,
  FormLabel,
  Typography,
  Divider,
  FormControl,
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
  textField:{
    marginRight: 10,
  },
  fullWidth:{
    width: '48%',
    marginRight: '15px',
    marginLeft: '15px',
  },
}
const Settings = ({
  groupInterviews,
  weekendsInterviews,
  timesAvailable,
  handleSwitch,
  onChange,
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
  <Divider/>
  <Typography variant="title" gutterBottom>
    Store Information
  </Typography>
  {
  Object.keys(user).length > 0
    ? (
    <form autoComplete="off">
      <div className="container">
        <TextField
          style={styles.textField}
          name="store"
          label="Store"
          id="margin-none"
          margin="dense"
          defaultValue={user.store}
          onChange={onChange}
        // helperText="Some important text"
        />
        <TextField
          style={styles.textField}
          name="email"
          label="Email"
          id="margin-none"
          margin="dense"
          defaultValue={user.email}
          onChange={onChange}
        // helperText="Some important text"
        />
        <TextField
          style={styles.textField}
          name="phone"
          label="Phone"
          id="margin-none"
          margin="dense"
          defaultValue={user.phone}
          onChange={onChange}
        // helperText="Some important text"
        />
      </div>
      <div className="container">
        <TextField
          style={styles.fullWidth}
          name="address"
          label="Street Adress"
          id="margin-none"
          margin="dense"
          defaultValue={user.address}
          onChange={onChange}
        // helperText="Some important text"
        />
        <FormControl>
          <TextField
            style={styles.textField}
            name="state"
            label="State"
            id="margin-none"
            margin="dense"
            defaultValue={user.address}
            onChange={onChange}
          // helperText="Some important text"
          />
        </FormControl>
      </div>
      <div>
        <TextField
          style={styles.textField}
          name="city"
          label="City"
          id="margin-none"
          margin="dense"
          defaultValue={user.city}
          onChange={onChange}
        // helperText="Some important text"
        />
        <TextField
          style={styles.textField}
          name="zipCode"
          label="Zip code"
          id="margin-none"
          margin="dense"
          defaultValue={user.zipCode}
          onChange={onChange}
        // helperText="Some important text"
        />
      </div>
    </form>
    ): (
      <div></div>
    )
  }
</Card>);

Settings.propTypes = {
  groupInterviews: PropTypes.bool.isRequired,
  weekendsInterviews: PropTypes.bool.isRequired,
  timesAvailable: PropTypes.array.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Settings;
