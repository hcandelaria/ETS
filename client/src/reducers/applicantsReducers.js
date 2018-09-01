//Export applicants Reducers
export default function reducer( state = {
  fetching: false,
  creatingApplicant: false,
  sellingApplicant: false,
  updatingApplicant: false,
  deletingApplicant: false,
  fetched: false,
  applicantsArray: [],
  data: [],
  errors: {},
  applicant: {
  }
}, action ) {

  // Switch statement
  switch(action.type){

    //Update Applicants array
    case 'UPDATE_APPLICANT' : {
      return{ ...state, applicant: action.payload}
    }
    case 'UPDATE_DATA' : {
      return{ ...state, data: action.payload}
    }
    case 'FETCH_APPLICANTS_FULFILLED' : {
      return {
        ...state,
        applicantArray: action.payload,
        fetching: false,
        fetched: true
     }
    }
    case 'FETCH_APPLICANTS_ERROR' : {
      return {
        ...state,
        errors: action.payload,
        fetching: false
      }
    }
    case 'CREATING_APPLICANT_FULFILLED' : {
      return {
        ...state,
        creatingApplicant: false
      }
    }
    case 'CREATING_APPLICANT_START' : {
      return {
        ...state,
        creatingApplicant: true,
      }
    }
    case 'CREATING_APPLICANT_ERROR' : {
      return {
        ...state,
        errors: action.payload,
        creatingApplicant: false
      }
    }
    case 'FETCH_APPLICANTS_START' : {
      return{
        ...state,
        fetching: true,
      }
    }
    case 'SELLING_APPLICANT_START' : {
      return{
        ...state,
        sellingApplicant: true
      }
    }
    case 'SELLING_APPLICANT_ERROR' : {
      return{
        ...state,
        errors: action.payload,
        sellingApplicant: false,
      }
    }
    case 'SELLING_APPLICANT_FULFILLED' : {
      return{
        ...state,
        sellingApplicant: false,
      }
    }
    case 'UPDATING_APPLICANT_START' : {
      return{
        ...state,
        updatingApplicant: true
      }
    }
    case 'UPDATING_APPLICANT_ERROR' : {
      return{
        ...state,
        errors: action.payload,
        updatingApplicant: false,
      }
    }
    case 'UPDATING_APPLICANT_FULFILLED' : {
      return{
        ...state,
        updatingApplicant: false,
      }
    }
    case 'DELETING_APPLICANT_START' : {
      return{
        ...state,
        deletingApplicant: true
      }
    }
    case 'DELETING_APPLICANT_ERROR' : {
      return{
        ...state,
        errors: action.payload,
        deletingApplicant: false,
      }
    }
    case 'DELETING_APPLICANT_FULFILLED' : {
      return{
        ...state,
        deletingApplicant: false,
      }
    }
    default: {
      return state;
    }
  }
}
