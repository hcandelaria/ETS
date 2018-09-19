import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core/';
import {
  Card,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core/';
import Moment from 'react-moment';

const STYLES = {
  button:{
    margin: '0px 5px',
  },
  title:{
    color: '#FFFFFF'
  },
}

const Interviews = ({
  day,
  times,
  getSteps,
  getStepContent,
  activeStep,
  onClick,
}) => (
  <div>
    <Typography variant='title'>
      <Moment parse="ddd" format="dddd, MMMM Do YYYY">
        {day}
      </Moment>
    </Typography>
    {
      times.map(time =>{
        return(
          <Button onClick={onClick} variant="outlined" key={time} name={time}>
            <Moment format="hh:mm a" parse="HH:mm">{time}</Moment>
          </Button>
        )
      })
    }
  </div>
);
Interviews.propTypes = {
  day: PropTypes.string.isRequired,
  times: PropTypes.array.isRequired,
  getSteps: PropTypes.array.isRequired,
  getStepContent: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Interviews;
