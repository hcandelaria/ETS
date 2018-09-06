import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings.jsx';

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
  }
})
export default class SettingsPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

  };



  /**
   * Render the component.
   */
  render() {
    return (
      <Paper className='container' style={styles.marginTop}>
        <Settings />
      </Paper>
    )
  }

}
