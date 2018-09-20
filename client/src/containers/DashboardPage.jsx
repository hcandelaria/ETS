//  Import packages
import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

//  Import Component
import Paper from '@material-ui/core/Paper';
import EmailPage from './EmailPage.jsx';

const styles = {
  marginTop: {
    marginTop: '20px',
  },
}

//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname,
  }
})
export default class DashboardPage extends React.Component {

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
        <EmailPage />
      </Paper>
    )
  }

}
