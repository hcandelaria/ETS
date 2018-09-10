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
  Icon,
  Button,
  Toolbar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
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
    width: '40%'
  },
  AddressStyle:{
    width: '60%',
    marginLeft: 30,
  },
  stateStyle:{
    width: '30%',
    marginLeft: 25,
  },
  saveIcon:{
    color: '#28BB43',
    backgroundColor: '#FFFFFF',
    marginLeft: '10px',
  },
  cancelIcon:{
    color: 'red',
    backgroundColor: '#FFFFFF',
    marginLeft: '10px',
  },
  flex: {
    flexGrow: 1
  },
  row:{
    width: '100%',
  },
}
const Settings = ({
  groupInterviews,
  weekendsInterviews,
  timesAvailable,
  handleSwitch,
  onChange,
  user,
  onSubmit
}) => (<Card className="container">
  <h2 className="card-heading" style={styles.title}>Settings</h2>
    {/* interviews ExpansionPanel*/}
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
        <Toolbar>
          <Typography variant="title" style={styles.flex}>
            Interviews
          </Typography>
        </Toolbar>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
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
        <br/>
        <Divider/>
        <br/>
        <FormGroup row>
          <FormLabel style={styles.label}>From:</FormLabel>
          {
            timesAvailable.map(a => {
              return (
                <FormControl key={a.id}>
                  <FormControlLabel
                    control={<Switch checked={a.available} value={a.day} color="primary"/>}
                  />
                  <TextField
                    disabled={!a.available}
                    id="time"
                    label={a.day}
                    type="time"
                    defaultValue={a.from}
                    InputLabelProps={
                      { shrink: true }
                    }
                    inputProps={
                      { step: a.step } // step: 300, 5 min
                    }
                  />
                </FormControl>
              )
            })
          }
        </FormGroup>
        <br/>
        <FormGroup row>
          <FormLabel style={styles.label}>To:</FormLabel>
          {
            timesAvailable.map(a => {
              return (
                <TextField
                  key={a.id}
                  disabled={!a.available}
                  id="time" label={a.day}
                  type="time"
                  defaultValue={a.to}
                  InputLabelProps={{
                    shrink: true
                    }} inputProps={{
                      // step: 300, 5 min
                      step: a.step
                    }}
                />
              )
            })
          }
        </FormGroup>
      </div>
    </ExpansionPanelDetails>
    <ExpansionPanelActions>
      <Typography>
        <Button variant="extendedFab" style={styles.cancelIcon} aria-label="close">
          <Icon>close</Icon>Cancel
        </Button>

        <Button variant="extendedFab" style={styles.saveIcon} aria-label="Save">
          <Icon>check</Icon>Save
        </Button>
      </Typography>
    </ExpansionPanelActions>
    </ExpansionPanel>
    {/* Account ExpansionPanel*/}
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
        <Toolbar>
          <Typography variant="title" style={styles.flex}>
            Account
          </Typography>
        </Toolbar>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {
        Object.keys(user).length > 0
          ? (
          <form autoComplete="off">
            <div className="container">
              <TextField
                style={styles.textField}
                name="name"
                label="Name"
                id="margin-none"
                margin="dense"
                defaultValue={user.name}
                onChange={onChange}
              // helperText="Some important text"
              />
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
            </div>
            <div className="container">
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
                style={styles.AddressStyle}
                name="address"
                label="Street Address"
                id="margin-none"
                margin="dense"
                defaultValue={user.address}
                onChange={onChange}
              // helperText="Some important text"
              />
              <FormControl>
                <TextField
                  style={styles.stateStyle}
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
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Typography>
          <Button variant="extendedFab" style={styles.cancelIcon} aria-label="close">
            <Icon>close</Icon>Cancel
          </Button>

          <Button onClick={onSubmit} variant="extendedFab" style={styles.saveIcon} aria-label="Save">
            <Icon>check</Icon>Save
          </Button>
        </Typography>
      </ExpansionPanelActions>
    </ExpansionPanel>

</Card>);

Settings.propTypes = {
  groupInterviews: PropTypes.bool.isRequired,
  weekendsInterviews: PropTypes.bool.isRequired,
  timesAvailable: PropTypes.array.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Settings;
