import React, { Component } from 'react';
import FullWidthTabs from './scorecard-subfiles/Tabs';


//This class contains displaying questions inside
export default class Scorecard extends Component {
  render() {
    return (
        <div>
          <FullWidthTabs modelID={this.props.modelID} handleNext={this.props.handleNext}/>
        </div>
    )
  }
}

