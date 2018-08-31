//Import packages
import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
@connect((store) => {
  return{
    tableHeight: store.settings.tableHeight
  }
})
export default class ItemTable extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <Table
        onRowSelection={this.props.handleRowSelection}
        fixedHeader={true}
        selectable={true}
        multiSelectable={false}
        fixedFooter={true}
        height={this.props.tableHeight}
      >
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}
          enableSelectAll={true}
        >
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>quantity</TableHead>
            <TableHead>price</TableHead>
            <TableHead>description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows={true}
          deselectOnClickaway={false}>
          {
            this.props.itemArray.map((item) =>{
            return(
              <TableRow key={item._id} id ={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
