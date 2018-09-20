import React from 'react';
import { connect } from 'react-redux';
import Interviews from '../components/Interviews.jsx';
import { fetchUserByStore } from '../actions/usersActions';
import { changeApplicant, createInterview } from '../actions/applicantsActions';
import {
  Card,
  Stepper,
  StepLabel,
  Typography,
  Step,
  Button,
  TextField,
} from '@material-ui/core/';
import Moment from 'react-moment';

const STYLES = {
  marginTop: {
    marginTop: '20px',
  },
  title:{
    color: '#FFFFFF'
  },
  textField:{
    marginRight: 10,
  }
};

//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname.split('/'),
    schedule: store.applicants.schedule,
    activeStep: store.applicants.activeStep,
    steps: store.applicants.steps,
    skipped: store.applicants.skipped,
    applicant: store.applicants.applicant,
    interviewTime: store.applicants.interviewTime,
  }
})
class InterviewsPage extends React.Component{
  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    this.calculateTimes = this.calculateTimes.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.processInterview = this.processInterview.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.isStepOptional  = this.isStepOptional .bind(this);
    this.handleBack  = this.handleBack .bind(this);
    this.handleSkip  = this.handleSkip .bind(this);
    this.changeApplicant  = this.changeApplicant .bind(this);

  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const STORE = this.props.location[2];
    this.props.dispatch(fetchUserByStore(STORE));
  };
  handleNext = () => {
    if(this.props.activeStep === this.props.steps.length - 1){

      const STOREID = this.props.location[2];
      const FNAME = this.props.applicant.fName;
      const LNAME = this.props.applicant.lName;
      const EMAIL = this.props.applicant.email;
      const PHONE = this.props.applicant.phone;
      const INTERVIEWTIME = this.props.interviewTime;
      const INTERVIEWERID = this.props.location[3];
      let formData = `store=${STORE}&fName=${FNAME}&lName=${LNAME}&email=${EMAIL}`;
          formData += `&phone=${PHONE}&interviewTime=${INTERVIEWTIME}&interviewerId=${INTERVIEWERID}`;

      this.props.dispatch(createInterview(STORE, formData));

    }
    const activeStep = this.props.activeStep;
    let skipped = this.props.skipped;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    this.props.dispatch({type: 'UPDATE_ACTIVESTEP', payload: activeStep + 1});
    this.props.dispatch({type: 'UPDATE_SKIPPED', payload: skipped });
  };
  isStepOptional = step => {
    return step === 1;
  };
  handleBack = () => {
    const activeStep = this.props.activeStep;
    this.props.dispatch({type: 'UPDATE_ACTIVESTEP', payload: activeStep - 1});

  };
  handleReset = () => {
    this.props.dispatch({type: 'UPDATE_ACTIVESTEP', payload: 0})
  };

  handleSkip = () => {
    const activeStep = this.props.activeStep;

    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    let skipped = new Set(this.props.skipped.values());
    skipped.add(activeStep);

    this.props.dispatch({ type: 'UPDATE_SKIPPED', payload: skipped });
    this.props.dispatch({ type: 'UPDATE_ACTIVESTEP', payload: activeStep + 1});
  };
  /**
   * @param {string} F start time
   * @param {string} T finish time
   * @param {string} S time between each available time
   *
   * @return {array} results with the available times for interviews
   */
  calculateTimes(F,T,S){
    let tempResults = [],
        results = [],
        step = (parseInt(S)/60)/60,
        convertFrom = (F.split(':')),
        convertTo = ( T.split(':'));

    let from = parseInt(convertFrom[0]) + parseInt(convertFrom[1])/60;
    let to = parseInt(convertTo[0]) + parseInt(convertTo[1])/60;

    while(from < to){
      tempResults.push(from);
      from+=step;
    }
    tempResults.forEach( time => {
      let h = Math.floor(time);
      let c = (time % 1) * 60;
      let t = c <= 9 ? `${h}:${c}0`:`${h}:${c}`;
      results.push(t);
    })

    return results;
  };

  isStepSkipped(step) {
    return this.props.skipped.has(step);
  }

  processInterview(event){
    event.preventDefault();
    let time = event.target.name ? event.target.children[0].children[0].dateTime : event.target.dateTime;
    this.props.dispatch({type: 'UPDATE_INTERVIEWTIME', payload: time})
    this.handleNext();
  };
  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <div className="field-line">
              <TextField
                label="First Name"
                type="text"
                name="fName"
                onChange={this.changeApplicant}
                style={STYLES.textField}
              />
              <TextField
                label="Last Name"
                type="text"
                name="lName"
                onChange={this.changeApplicant}
                style={STYLES.textField}
              />
            </div>
            <div className="field-line">
              <TextField
                label="Email"
                name="email"
                onChange={this.changeApplicant}
                style={STYLES.textField}
              />
              <TextField
                label="Phone"
                name="phone"
                onChange={this.changeApplicant}
                style={STYLES.textField}
              />
            </div>
          </div>
        );
      case 1:
        return (
            this.props.schedule.map( d => {
              return (
                <div key={d.day}>
                  <Interviews
                    day={d.day}
                    times={this.calculateTimes(d.from,d.to,d.step)}
                    onClick={this.processInterview}
                    activeStep={this.props.activeStep}
                    getSteps={this.props.steps}
                    getStepContent={this.getStepContent}
                  />
                </div>
              )
            })
        );
      case 2:
        return (
          <div>
            <Typography>
              Applicant: {`${this.props.applicant.fName} ${this.props.applicant.lName}`}
            </Typography>
            <Typography>
              Contact information: {`${this.props.applicant.email} ${this.props.applicant.phone}`}
            </Typography>
            <Typography>
              <Moment parse="x" format="hh:mm a dddd, MMMM Do YYYY">
                {this.props.interviewTime}
              </Moment>
            </Typography>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeApplicant(event) {
    event.preventDefault();
    this.props.dispatch(changeApplicant(event, this.props.applicant));
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Card className="container" style={STYLES.marginTop}>
        <h2 className="card-heading" style={STYLES.title}>Interviews</h2>
        <div>
          <Stepper activeStep={this.props.activeStep}>
            {this.props.steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {this.props.activeStep === this.props.steps.length ? (
            <div>
              <Typography>
                All steps completed - you&quot;re finished
              </Typography>
              {/* <Button onClick={this.handleReset}>
                Reset
              </Button> */}
            </div>
          ) : (
            <div>
              <div>{this.getStepContent(this.props.activeStep)}</div>
              <div>
                <Button
                  disabled={this.props.activeStep === 0}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
                {
                  this.props.activeStep != 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      // disabled={this.props.activeStep === 1}
                      onClick={this.handleNext}
                    >
                      {this.props.activeStep === this.props.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  ) : (
                    <div></div>
                  )
                }
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default InterviewsPage;
