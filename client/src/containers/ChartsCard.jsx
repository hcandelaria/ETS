import React, { Component } from "react";
import OurBarChart from "../components/OurBarChart.jsx";

class Charts extends Component {


  render() {
    return (
      <div>
        <OurBarChart itemArray={this.props.itemArray}/>
      </div>
    );
  }
}

export default Charts;
