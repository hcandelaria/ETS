//Export applicants Reducers
export default function reducer( state = {
  fetching: false,
  creatingApplicant: false,
  updatingApplicant: false,
  deletingApplicant: false,
  fetched: false,
  applicantsArray: [],
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
    default: {
      return state;
    }
  }
}
