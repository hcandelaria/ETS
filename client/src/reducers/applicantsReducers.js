//Export applicants Reducers
export default function reducer( state = {
  fetching: false,
  creatingApplicant: false,
  updatingApplicant: false,
  deletingApplicant: false,
  fetched: false,
  applicantsArray: [],
  selectedApplicantsRows: [],
  errors: {},
}, action ) {

  // Switch statement
  switch(action.type){

    case 'CREATING_APPLICANT' : {
      return {
        ...state,
        applicantsArray: [...state.applicantsArray, action.payload],
        creatingApplicant: true,
      }
    }
    case 'SELECT_ROWS' : {
      return {
        ...state,
        selectedApplicantsRows: action.payload,
      }
    }
    case 'SELECT_ROW' : {
      return {
        ...state,
        selectedApplicantsRows: [...state.selectedApplicantsRows, action.payload],
      }
    }
    case 'REMOVE_ROW' : {
      return {
        ...state,
        selectedApplicantsRows: action.payload,
      }
    }
    case 'CLEAR_SELECT_ROWS' : {
      return {
        ...state,
        selectedApplicantsRows: [],
      }
    }

    default: {
      return state;
    }
  }
}
