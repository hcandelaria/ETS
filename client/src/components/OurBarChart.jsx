import React, { Component } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import { connect } from 'react-redux';
import { chartItemsAvailable } from '../actions/itemsActions';

//Connect to redux store
@connect((store) => {
  return{
    data: store.items.data
  }
})
export default class OurBarChart extends React.Component {

  render() {
    // Charts go here
    return (
      <div>
      <BarChart width={600} height={300} data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="quantity" fill="#9b65bb" />
       <Bar dataKey="sold" fill="#85bb65" />
      </BarChart>
      </div>
    );

  }
}
