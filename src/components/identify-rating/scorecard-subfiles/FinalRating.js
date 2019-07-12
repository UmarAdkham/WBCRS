import React, { Component } from 'react';


//This class contains inside displaying questions 
export default class FinalRating extends Component {
  render() {
    return (
        <div>
          <p>Obligor: {this.props.obligor}</p>
          <p>Model: {this.props.model}</p>
          <p>Final Score: {this.props.rating}</p>
        </div>
    )
  }
}

