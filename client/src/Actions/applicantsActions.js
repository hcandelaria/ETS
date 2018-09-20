//  Import libraries
import axios from 'axios';
import Auth from '../modules/Auth';
import { push } from 'react-router-redux';

export function updateApplicant(applicant) {
  return function(dispatch) {
    dispatch({
      type: 'CREATING_APPLICANT',
      payload: applicant
    })
  }
}
export function changeApplicant(event, applicant){
  return function(dispatch) {
    const field = event.target.name;
    applicant[field] = event.target.value;
    dispatch({type: 'UPDATE_USER', payload: applicant});
  }
}
//  Export functions
export function fetchApplicantsByInterviewerId(interviewerId){
  return function(dispatch) {
    dispatch({type: 'FETCH_APPLICANTS_START'})

    let authReq = {
      method: 'GET',
      url: `/api/interviews/`,
      headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: interviewerId,
      json: true
    };

    axios(authReq)
      .then((res) => {
        dispatch({type: 'FETCH_APPLICANTS_FULFILLED', payload: res.data})
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_APPLICANTS_ERROR', payload: err })
      })
  }
}
export function createInterview( store, interview ){
  return function( dispatch ) {
    dispatch({type: 'UPDATE_INTERVIEW_START'})

    axios.post(`/api/interviews/${store}`, interview)
      .then( (res) => {
        dispatch({type: 'CREATING_INTERVIEW_FULFILLED'});
      })
      .catch((err) => {
        dispatch({type: 'CREATING_INTERVIEW_ERROR', payload: err})
      })
  }
}
export function sellItem( itemData, id) {
  return function( dispatch ) {
    dispatch({type: 'SELLING_ITEM_START'})

    let authReq = {
      method: 'POST',
      url: `/api/item/${id}`,
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true,
      data: itemData
    }

    axios(authReq)
      .then( (res) => {
        dispatch({type: 'SELLING_ITEM_FULFILLED', payload: res.data})
      })
      .catch((err) =>{
        dispatch({type: 'SELLING_ITEM_ERROR', payload: err})
      })

  }
}
export function updateItem( itemData, id) {
  return function( dispatch ) {
    dispatch({type: 'UPDATING_ITEM_START'})

    let authReq = {
      method: 'PUT',
      url: `/api/item/${id}`,
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true,
      data: itemData
    }

    axios(authReq)
      .then( (res) => {
        dispatch({type: 'UPDATING_ITEM_FULFILLED', payload: res.data})
      })
      .catch((err) =>{
        dispatch({type: 'UPDATING_ITEM_ERROR', payload: err})
      })

  }
}
export function deleteItem(id){
  return function( dispatch ) {
    dispatch({type: 'DELETING_ITEM_START'})

    let authReq = {
      method: 'DELETE',
      url: `/api/item/${id}`,
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true,
    }
    axios(authReq)
      .then( (res) => {
        dispatch({type: 'DELETING_ITEM_FULFILLED', payload: res.data})
      })
      .catch((err) =>{
        dispatch({type: 'DELETING_ITEM_ERROR', payload: err})
      })

  }
}
export function addItem(item) {
  return { type: 'ADD_ITEM', payload: item }
}

export function onChangeItem(event, item) {
  return function(dispatch){
    const field = event.target.name;
    item[field] = event.target.value;
    dispatch({type: 'UPDATE_ITEM', payload: item})
  }
}
//Display available items
export function chartItemsAvailable(itemArray){
  return function(dispatch){
    const result = itemArray.filter(item => item.quantity > 0);
    dispatch({type: 'UPDATE_DATA', payload: result})
  }
}

export function chartDataYear(itemArray){
  return function(dispatch){
    const result = itemArray.filter( (item) => {
      item.sold.length > 6;
    });

  }
}
