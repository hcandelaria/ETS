//  Import packages
import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchApplicantsByInterviewerId  } from '../actions/applicantsActions';
import InterviewsTable from '../components/InterviewsTable.jsx';
import moment from 'moment';
import Moment from 'react-moment';
//  Import Component
import {
  Paper,
  Button,
  Toolbar,
  Icon,
  Typography
} from '@material-ui/core/';

const STYLES = {
  marginTop: {
    marginTop: '20px',
  },
  title:{
    color: '#FFFFFF'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flexGrow: 1
  },
  alignLeft: {
    // marginRight: '100px'
  },
  alignRight: {
    // marginLeft: '100px'
  },
}

//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname,
    applicantsArray: store.applicants.applicantsArray,
    dateSelectedInterviews : store.applicants.dateSelectedInterviews,
    user: store.users.user,
    date: store.settings.date,
    rows: store.settings.rows,
    selectedInterviewsRows: store.applicants.selectedInterviewsRows,
  }
})
export default class ApplicantPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    this.backPageHandle = this.backPageHandle.bind(this);
    this.nextPageHandle = this.nextPageHandle.bind(this);

  }
  isSelected = (id) => this.props.selectedInterviewsRows.indexOf(id) !== -1;

  handleSelectAllClick = (event, id) => {

    let selected = this.props.dateSelectedInterviews.map(n => n._id);
    if (this.props.selectedInterviewsRows.length > 0) {
      this.props.dispatch({
        type: "CLEAR_SELECT_INTERVIEWS_ROWS",
      })
    }else{
      this.props.dispatch({
        type: "SELECT_INTERVIEWS_ROWS",
        payload: selected,
      })
    }
  };
  handleRowSelectClick = (event, id) => {
    let selectedIndex = this.props.selectedInterviewsRows.indexOf(id)
    if(selectedIndex === -1){
      this.props.dispatch({
        type: "SELECT_INTERVIEW_ROW",
        payload: id,
      })
    }else{
      let newInterviewsRows = [];

      newInterviewsRows = newInterviewsRows.concat(
        this.props.selectedInterviewsRows.slice(0, selectedIndex),
        this.props.selectedInterviewsRows.slice(selectedIndex + 1),
      );

      this.props.dispatch({
        type: "REMOVE_INTERVIEW_ROW",
        payload: newInterviewsRows,
      })
    }
  };
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    let id = localStorage.getItem('_id');
    const DATE = moment().unix();
    console.log('DATE',DATE)
    Promise.resolve(this.props.dispatch(fetchApplicantsByInterviewerId(id,DATE)))
      .then( () => {
        this.props.dispatch({type: 'UPDATE_DATE', payload: DATE});
        // this.getInteviewsByDay();
      }).catch( (err) => {
        //Warring any errors
        console.log('WARRING!!!', err);
      })


  };

  backPageHandle(){
    let displayDate = this.props.date;
    let date = moment.unix(displayDate).subtract(1, 'days');
    date = date.format('X');
    this.props.dispatch({type: 'UPDATE_DATE', payload: date});

    let selectedInterviews = this.props.applicantsArray.filter( applicant => {

      let t = moment.unix(applicant.interviewTime).format('YYYY-MM-DD');
      let d = moment.unix(date).format('YYYY-MM-DD');

      return moment(t).isSame(d, 'day');
    });
    this.props.dispatch({type: 'UPDATE_DATE_SELECTED_INTERVIEWS', payload: selectedInterviews});
  };
  nextPageHandle(){
    let displayDate = this.props.date;
    let date = moment.unix(displayDate).add(1, 'days');
    date = date.format('X');
    this.props.dispatch({type: 'UPDATE_DATE', payload: date});

    let selectedInterviews = this.props.applicantsArray.filter( applicant => {

      let t = moment.unix(applicant.interviewTime).format('YYYY-MM-DD');
      let d = moment.unix(date).format('YYYY-MM-DD');

      return moment(t).isSame(d, 'day');
    });
    this.props.dispatch({type: 'UPDATE_DATE_SELECTED_INTERVIEWS', payload: selectedInterviews});
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <Paper className='container' style={STYLES.marginTop}>
        <h2 className="card-heading" style={STYLES.title}>Interviews</h2>
          <div style={STYLES.container}>
            <Typography variant="title">
              <Button onClick={this.backPageHandle} color="primary" styles={STYLES.alignLeft}>
                <Icon>keyboard_arrow_left</Icon>
              </Button>
              <Moment parse="X" format="dddd, MMMM Do YYYY">
                {this.props.date}
              </Moment>
              <Button onClick={this.nextPageHandle} color="primary" styles={STYLES.alignRight}>
                <Icon>keyboard_arrow_right</Icon>
              </Button>
            </Typography>
          </div>
          <InterviewsTable
            Interviews={this.props.dateSelectedInterviews}
            rows={this.props.rows}
            selectedInterviewsRows={this.props.selectedInterviewsRows}
            onSelectAllClick={this.handleSelectAllClick}
            isSelected={this.isSelected}
            numSelected={this.props.selectedInterviewsRows.length}
            rowCount={this.props.dateSelectedInterviews.length}
            rowSelectClick={this.handleRowSelectClick}/>
      </Paper>
    )
  }

}
