//  Import libraries
import axios from 'axios';
import Auth from '../modules/Auth';
import { push } from 'react-router-redux';


export function fetchUser(formData){

  return function(dispatch) {
    //Start fetch
    dispatch({type: 'LOGIN_USER_START'});
    //Post request for login user
    axios.post(`/auth/login`, formData)
      .then((res) => {
        //authenticated
        Auth.authenticateUser(res.data.token);
        dispatch({type: 'UPDATE_AUTHENTICATED'});
        //Save _id
        localStorage.setItem('_id', res.data.user.id);

        //Get user data
        dispatch({type: 'LOGIN_USER_FULFILLED', payload: res.data.user, response: res.data.message, status: 'success'});

      })
      //Catch error
      .catch((err) =>{
        console.log('test:', err)
        dispatch({type: 'LOGIN_USER_ERROR', payload: err });
      })
  }
}
export function fetchUserById(id){
  return function(dispatch) {
    //Start fetch
    dispatch({type: 'FETCH_USER_START'});
    //Post request for login user
    axios.get(`/auth/user/${id}` )
      .then((res) => {
        //Get user data
        dispatch({type: 'FETCH_USER_FULFILLED', payload: res.data, response: res.data.message, status: 'success'});

      })
      //Catch error
      .catch((err) =>{
        console.log('fetchUserById:', err)
        dispatch({type: 'USER_ERROR', payload: err });
      })
  }
}
export function changeUser(event, user){
  return function(dispatch) {
    const field = event.target.name;
    user[field] = event.target.value;
    dispatch({type: 'UPDATE_USER', payload: user});
  }
}
export function createUser(formData){
  return function(dispatch){
    //Start fetch
    dispatch({type: 'CREATE_USER_START'})
    //Post request for login user
    axios.post(`/auth/signup`, formData)
      .then((res) => {
        dispatch({type: 'CREATE_USER_FULFILLED', payload: {}, response: res.data.message, status: 'success'});
      })
      //Catch error
      .catch((err) =>{
        dispatch({type: 'CREATE_USER_ERROR', payload: err });
      })
  }
}
export function updateUser(id, formData){
  return function(dispatch){
    //Start fetch
    dispatch({type: 'UPDATE_USER_START'})
    //Post request for login user
    axios.put(`/auth/user/${id}/`, formData)
      .then((res) => {
        dispatch({type: 'UPDATE_USER_FULFILLED', payload: res.data, response: res.data.message, status: 'success'});
      })
      //Catch error
      .catch((err) =>{
        dispatch({type: 'UPDATE_USER_ERROR', payload: err });
      })
  }
}
export function updateTimesAvailable(id, schedule){

  console.log(schedule);

  return function(dispatch){
    axios.put(`/auth/user/schedule/${id}`, schedule).then((res)=>{
      console.log(res.data);
    }).catch((err) =>{
      console.log(err);
    })
  }
}
