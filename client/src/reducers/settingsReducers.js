import Auth from '../modules/Auth';


export default function reducer ( state ={
  authenticated: false,
  gmailSignedin: false,
  secretData: '',
  errors: {},
  successMessage: '',
  tableHeight: '50px',
  menu: false,
  groupInterviews: false,
  weekendsInterviews: false,
  rows : [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  ],
  timesAvailable: [
    // {id: 0, day: 'Sunday', available: false, from: '14:00', to: '17:30', step: 900},
    {id: 1, day: 'Monday', available: true, from: '14:00', to: '17:30', step: 1800, startDate: '9/12/2018'},
    {id: 2, day: 'Tuesday', available: true, from: '14:00', to: '17:30', step: 1800, startDate: '9/12/2018'},
    {id: 3, day: 'Wednesday', available: true, from: '14:00', to: '17:30', step: 1800, startDate: '9/12/2018'},
    {id: 4, day: 'Thursday', available: true, from: '14:00', to: '17:30', step: 1800, startDate: '9/12/2018'},
    {id: 5, day: 'Friday', available: true, from: '14:00', to: '17:30', step: 1800, startDate: '9/12/2018'},
    // {id: 6, day: 'Saturday', available: false, from: '14:00', to: '17:30', step: 900},
  ]
}, action ) {

  switch(action.type){
    case 'UPDATE_GMAIL_SIGNEDIN' : {
        return {...state, gmailSignedin: action.payload}
    }
    case 'UPDATE_ROW' : {
      return {...state, row: action.payload}
    }

    case 'UPDATE_TABLEHEIGHT': {
      return {...state, tableHeight: action.payload}
    }
    case 'UPDATE_SECRETDATA' : {
      return {...state, secretData: action.payload}
    }
    case 'UPDATE_MENU' : {
      if(state.menu){
        return {...state, menu: false}
      }else{
        return {...state, menu: true}
      }
    }
    case 'UPDATE_GROUPINTERVEWS' : {
      if(state.groupInterviews){
        return {...state, groupInterviews: false}
      }else{
        return {...state, groupInterviews: true}
      }
    }
    case 'SETTING_ERRORS' : {
      return { ...state, errors: action.payload }
    }
    case 'UPDATE_AUTHENTICATED' : {
      if(state.authenticated === true){
        Auth.deauthenticateUser();
        return {...state, authenticated: false}
      }else {
        return {...state, authenticated: true}
      }
    }
    default : {
      return state;
    }
  }
}
