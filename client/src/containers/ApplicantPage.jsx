//  Import packages
import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchApplicantsByInterviewerId  } from '../actions/applicantsActions';

//  Import Component
import Paper from '@material-ui/core/Paper';

const STYLES = {
  marginTop: {
    marginTop: '20px',
  },
  title:{
    color: '#FFFFFF'
  },
}

//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname,
    applicantsArray: store.applicants.applicantsArray,
    user: store.users.user,
  }
})
export default class ApplicantPage extends React.Component {

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

    // let id = localStorage.getItem('_id');
    // console.log(id)
    // Promise.resolve(this.props.dispatch(fetchUserById(id)))
    //   .then( (res) =>{
    //     console.log(this.props.user);
    //   })
    //   .catch( (err) =>{
    //     console.log('ApplicantPage error: ', err);
    //   })
    let id = localStorage.getItem('_id');
    console.log(`id: ${id}`)
    this.props.dispatch(fetchApplicantsByInterviewerId(id));
  };



  /**
   * Render the component.
   */
  render() {
    return (
      <Paper className='container' style={STYLES.marginTop}>
        <h2 className="card-heading" style={STYLES.title}>Applicants</h2>
      </Paper>
    )
  }

}
