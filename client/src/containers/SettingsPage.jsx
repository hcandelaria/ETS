import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings.jsx';
import { store } from '../modules/store.js';
import { fetchUserById, changeUser, updateUser, updateTimesAvailable } from '../actions/usersActions.js';

const STYLES = {
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
    this.changeUser = this.changeUser.bind(this);
    this.processForm = this.processForm.bind(this);
    this.processSchedule = this.processSchedule.bind(this);
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
    const NAME = encodeURIComponent(this.props.user.name);
    const STORE = encodeURIComponent(this.props.user.store);
    const EMAIL = encodeURIComponent(this.props.user.email);
    const PHONE = encodeURIComponent(this.props.user.phone);
    const ADDRESS = encodeURIComponent(this.props.user.address);
    const STATE = encodeURIComponent(this.props.user.state);
    const CITY = encodeURIComponent(this.props.user.city);
    const ZIPCODE = encodeURIComponent(this.props.user.zipCode);
    const TIMESAVAILABLE = this.props.timesAvailable

    let formData =`name=${NAME}&store=${STORE}&email=${EMAIL}`;
        formData = formData + `&phone=${PHONE}&address=${ADDRESS}`;
        formData = formData + `&state=${STATE}&city=${CITY}&zipCode=${ZIPCODE}`;
        formData = formData + `&timesAvailable=${TIMESAVAILABLE}`;

    let id = localStorage.getItem('_id');
    this.props.dispatch(updateUser(id, formData));
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processSchedule(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const TIMESAVAILABLE = this.props.timesAvailable;

    TIMESAVAILABLE.forEach(element =>{
      const AVAILABLE = encodeURIComponent(element.available);
      const DAY = encodeURIComponent(element.day);
      const FROM = encodeURIComponent(element.from);
      const TO = encodeURIComponent(element.to);
      const ID = encodeURIComponent(element.id);
      const STEP = encodeURIComponent(element.step);
      const STARTDATE = encodeURIComponent(element.startDate);

      const FORMDATA = `available=${AVAILABLE}&day=${DAY}&from=${FROM}&to=${TO}&id=${ID}&step=${STEP}&startDate=${STARTDATE}`;

      let id = localStorage.getItem('_id');

      this.props.dispatch(updateTimesAvailable(id, FORMDATA));
    });

  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    let _id = localStorage.getItem('_id');
    this.props.dispatch(fetchUserById(_id));
  };
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    event.preventDefault();
    this.props.dispatch(changeUser(event, this.props.user))
  }
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
      <Paper className='container' style={STYLES.marginTop}>
        <Settings
          groupInterviews={this.props.groupInterviews}
          weekendsInterviews={this.props.weekendsInterviews}
          timesAvailable={this.props.timesAvailable}
          handleSwitch={this.handleSwitch}
          user={this.props.user}
          onChange={this.changeUser}
          onSubmit={this.processForm}
          scheduleSubmit={this.processSchedule}
        />
      </Paper>
    )
  }

}
