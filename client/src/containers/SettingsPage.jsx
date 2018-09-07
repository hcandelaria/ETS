import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings.jsx';
import { fetchUserById } from '../actions/usersActions.js';
import { store } from '../modules/store.js';

const styles = {
  marginTop: {
    marginTop: '20px',
  },
}

//  Import Component
import Paper from '@material-ui/core/Paper';

//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname,
    groupInterviews: store.settings.groupInterviews,
    weekendsInterviews: store.settings.weekendsInterviews,
    timesAvailable: store.settings.timesAvailable,
    user: store.users.user,
  }
})
export default class SettingsPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    let _id = localStorage.getItem('_id');
    store.dispatch(fetchUserById(_id));
  };

  handleSwitch(){
    this.props.dispatch({
      type: 'UPDATE_GROUPINTERVEWS'
    })
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <Paper className='container' style={styles.marginTop}>
        <Settings
          groupInterviews={this.props.groupInterviews}
          weekendsInterviews={this.props.weekendsInterviews}
          timesAvailable={this.props.timesAvailable}
          handleSwitch={this.handleSwitch}
          user={this.props.user}
        />
      </Paper>
    )
  }

}
