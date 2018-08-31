//  Import libraries
import axios from 'axios';
import Auth from '../modules/Auth';
import { calculateTable, } from '../actions/settingsActions';

//  Export functions
export function fetchItems(id){
  return function(dispatch) {
    dispatch({type: 'FETCH_ITEMS_START'})

    let authReq = {
      method: 'GET',
      url: `/api/item/user/${id}`,
      headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    axios(authReq)
      .then((res) => {
        dispatch({type: 'FETCH_ITEMS_FULFILLED', payload: res.data})
        dispatch(chartItemsAvailable(res.data));
        dispatch(calculateTable(res.data.length))
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_ITEMS_ERROR', payload: err })
      })
  }
}
export function createItem( itemData ){
  return function( dispatch ) {
    dispatch({type: 'UPDATE_ITEM_START'})

    console.log(itemData)

    let authReq = {
      method: 'POST',
      url: '/api/item',
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true,
      data: itemData
    };

    axios(authReq)
      .then( (res) => {
        dispatch({type: 'CREATING_ITEM_FULFILLED', payload: res.data})
      })
      .catch((err) => {
        dispatch({type: 'CREATING_ITEM_ERROR', payload: err})
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
