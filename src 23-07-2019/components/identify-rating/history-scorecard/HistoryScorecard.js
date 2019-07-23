import React, { Component } from 'react';
import HistoryTabs from './HistoryTabs';


//This class contains inside displaying questions 
export default class HistoryScorecard extends Component {
  render() {
    return (
        <div>
          <HistoryTabs handleNext={this.props.handleNext}
                       scorecardID={this.props.scorecardID}
                       switchViews={this.props.switchViews}
                       />
        </div>
    )
  }
}

