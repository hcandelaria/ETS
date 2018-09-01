//  Import packages
import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

//  Import Component
import Card from '@material-ui/core/Card';
import ApplicantPage from './ApplicantPage.jsx';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { updateApplicant } from '../actions/applicantsActions';



//Styles
const buttonStyle = {
  margin: 5,
};
//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname,
    _id: store.users._id,
    row: store.settings.row,
    user: store.users.user,
    login: store.users.login,
    secretData: store.settings.secretData,
    openAddItem: store.settings.openAddItem,
    openSellItem: store.settings.openSellItem,
    openUpdateItem: store.settings.openUpdateItem,
    openDeleteItem: store.settings.openDeleteItem,
  }
})
export default class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    //  Bind function to this component
    this.addItem = this.addItem.bind(this);
    this.sellItem = this.sellItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    //  Bind handle modal
    this.addHandleModal = this.addHandleModal.bind(this);
    this.sellHandleModal = this.sellHandleModal.bind(this);
    this.updateHandleModal = this.updateHandleModal.bind(this);
    this.deleteHandleModal = this.deleteHandleModal.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);

  }

  //Add a new Item function
  addItem(item) {

    // create a string for an HTTP body message
    const name = encodeURIComponent(item.name);
    const description = encodeURIComponent(item.description);
    const quantity = encodeURIComponent(item.quantity);
    const price = encodeURIComponent(item.price);
    const user_id = encodeURIComponent(this.props._id);
    const itemData = `name=${name}&description=${description}&quantity=${quantity}&price=${price}&user_id=${user_id}`;

    //Clear Item
    this.props.dispatch({
      type:"UPDATE_ITEM",
      payload: {}
    })

    //Create new item
    Promise.resolve(this.props.dispatch(createItem(itemData)))
      .then( () =>{
        //Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })
  }
  //  Sell Item function
  sellItem(item){

    const id = item._id
    const quantity = encodeURIComponent(1);
    const price = encodeURIComponent(item.price);
    const soldItem = `quantity=${quantity}&price=${price}`;

    Promise.resolve(this.props.dispatch(sellItem(soldItem, id)))
      .then( () =>{
        //Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })

  }
  //  Update Item function
  updateItem(item){

    const id = item._id;
    const name = item.name;
    const quantity = item.quantity;
    const price = item.price;
    const description = item.description;

    const itemData = `name=${name}&quantity=${quantity}&price=${price}&description=${description}`;
    Promise.resolve(this.props.dispatch(updateItem(itemData, id)))
      .then( () =>{
        //Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
        //  Clear row
        this.props.dispatch({type: 'UPDATE_ROW', payload: ''})
        //  Clear item
        this.props.dispatch({
          type:"UPDATE_ITEM",
          payload: {}
        })
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })
  }
  //  Delete Item function
  deleteItem(item){

    const id = item._id
    Promise.resolve(this.props.dispatch(deleteItem(id)))
      .then( () =>{
        //  Clear item
        this.props.dispatch({type: 'UPDATE_ITEM', payload: {}});
        //  Clear row
        this.props.dispatch({type: 'UPDATE_ROW', payload: ''});
        //  Then reload all items
        this.props.dispatch(fetchItems(this.props._id));

      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })
  }
  // Item text handler
  onChangeItem(event) {
    event.preventDefault();
    this.props.dispatch(onChangeItem(event, this.props.item))
  }

  //  Select a row
  handleRowSelection( selectedRows ){
    //  Clear row
    this.props.dispatch({type: 'UPDATE_ROW', payload: ''})
    //  Clear item
    this.props.dispatch({
      type:"UPDATE_ITEM",
      payload: {}
    })

    if(selectedRows === 'all'){
      console.log('WARRING! YOU selected all rows this function is not available');
    }else if (selectedRows.length === 0){
      //Add Item to itemsChecked
      this.props.dispatch({type: 'UPDATE_ROW', payload: ''})
      //  Clear item
      this.props.dispatch({
        type:"UPDATE_ITEM",
        payload: {}
      })
    }else{
      let tempItem = (this.props.itemArray[selectedRows[0]])
      let item = {
        _id: tempItem._id,
        name: tempItem.name,
        quantity: tempItem.quantity,
        price: tempItem.price,
        soldItem: tempItem.soldItem,
        description: tempItem.description,
      }
      this.props.dispatch({type: 'UPDATE_ROW', payload: selectedRows[0]})
      this.props.dispatch({
        type:"UPDATE_ITEM",
        payload: item
      })
    }
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

  };
  //  Handle sell button function
  sellButtonValidation(){
    //  Var
    let row = this.props.row
    let item = this.props.itemArray[row]
    //  No row selected
    if(row === '' || !item){
      //Disabled button
      return true
    //  Row is selected
    }else{
      //  && there is quantity available to sell
      if (item.quantity > 0){
        // Enabled sell button
        return false;
       }else {
         // Disable sell button
         return true;
       }
    }
  }
  //  Handle add Modal
  addHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_ADDITEM'})
  }
  // Handle sell Modal
  sellHandleModal(event) {
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_SELLITEM'})
  }
  //  Handle update Modal
  updateHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_UPDATEITEM'})
  }
  //  Handle delete Modal
  deleteHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_DELETEITEM'})
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Card className='container'>
          <ApplicantPage />
        </Card>
      </div>
    )
  }

}
