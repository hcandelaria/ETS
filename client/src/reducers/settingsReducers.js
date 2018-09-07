import Auth from '../modules/Auth';


export default function reducer ( state ={
  authenticated: false,
  gmailSignedin: false,
  rows : [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  ],
  secretData: '',
  errors: {},
  successMessage: '',
  tableHeight: '50px',
  menu: false,
  
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
