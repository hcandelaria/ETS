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
  openAddItem: false,
  openSellItem: false,
  openUpdateItem: false,
  openDeleteItem: false,
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
    case 'UPDATE_MODAL_ADDITEM' : {
      if( state.openAddItem === false){
        return {...state, openAddItem: true}
      }else {
        return {...state, openAddItem: false}
      }
    }
    case 'UPDATE_MODAL_SELLITEM' : {
      if( state.openSellItem === false){
        return {...state, openSellItem: true}
      }else {
        return {...state, openSellItem: false}
      }
    }
    case 'UPDATE_MODAL_UPDATEITEM' : {
      if( state.openUpdateItem === false){
        return {...state, openUpdateItem: true}
      }else {
        return {...state, openUpdateItem: false}
      }
    }
    case 'UPDATE_MODAL_DELETEITEM' : {
      if( state.openDeleteItem === false){
        return {...state, openDeleteItem: true}
      }else {
        return {...state, openDeleteItem: false}
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
