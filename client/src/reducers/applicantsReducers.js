//Export applicants Reducers
export default function reducer( state = {
  fetching: false,
  creatingApplicant: false,
  updatingApplicant: false,
  deletingApplicant: false,
  creatingInterview: false,
  interviewCreated: false,
  fetched: false,
  activeStep: 0,
  skipped: new Set(),
  steps: ['User info', 'Choose a date', 'Confirm interview'],
  applicantsArray: [],
  schedule: [],
  applicant: {},
  dateSelectedInterviews: [],
  interviewTime: '',
  selectedApplicantsRows: [],
  selectedInterviewsRows: [],
  errors: {},
}, action ) {

  // Switch statement
  switch(action.type){

    case 'UPDATE_DATE_SELECTED_INTERVIEWS' : {
      return {
        ...state,
        dateSelectedInterviews: action.payload,
      }
    }
    case 'CREATING_APPLICANT' : {
      return {
        ...state,
        applicantsArray: [...state.applicantsArray, action.payload],
        creatingApplicant: true,
      }
    }
    case 'UPDATE_INTERVIEW_START' : {
      return {
        ...state,
        creatingInterview: true,
      }
    }
    case 'CREATING_INTERVIEW_FULFILLED' : {
      return {
        ...state,
        creatingInterview: false,
        interviewCreated: true,
      }
    }
    case 'FETCH_APPLICANTS_START' : {
      return {
        ...state,
        fetching: true,
      }
    }
    case 'FETCH_APPLICANTS_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        applicantsArray: action.payload
      }
    }
    case 'FETCH_APPLICANTS_ERROR' : {
      return {
        ...state,
        fetching: false,
        applicantsArray: [],
        errors: action.payload,
      }
    }
    case 'FETCH_USER_SCHEDULE_FULFILLED' : {
      return {
        ...state,
        schedule: action.payload,
      }
    }
    case 'UPDATE_ACTIVESTEP' : {
      return {...state, activeStep: action.payload}
    }
    case 'UPDATE_SKIPPED' : {
      return {...state, skipped: action.payload}
    }
    case 'UPDATE_INTERVIEWTIME' : {
      return {
        ...state,
        interviewTime: action.payload,
      }
    }
    case 'SELECT_APPLICANTS_ROWS' : {
      return {
        ...state,
        selectedApplicantsRows: action.payload,
      }
    }
    case 'SELECT_APPLICANT_ROW' : {
      return {
        ...state,
        selectedApplicantsRows: [...state.selectedApplicantsRows, action.payload],
      }
    }
    case 'REMOVE_APPLICANT_ROW' : {
      return {
        ...state,
        selectedApplicantsRows: action.payload,
      }
    }
    case 'CLEAR_SELECT_APPLICANTS_ROWS' : {
      return {
        ...state,
        selectedApplicantsRows: [],
      }
    }
    case 'SELECT_INTERVIEWS_ROWS' : {
      return {
        ...state,
        selectedInterviewsRows: action.payload,
      }
    }
    case 'SELECT_INTERVIEW_ROW' : {
      return {
        ...state,
        selectedInterviewsRows: [...state.selectedApplicantsRows, action.payload],
      }
    }
    case 'REMOVE_INTERVIEW_ROW' : {
      return {
        ...state,
        selectedInterviewsRows: action.payload,
      }
    }
    case 'CLEAR_SELECT_INTERVIEWS_ROWS' : {
      return {
        ...state,
        selectedInterviewsRows: [],
      }
    }
    default: {
      return state;
    }
  }
}
