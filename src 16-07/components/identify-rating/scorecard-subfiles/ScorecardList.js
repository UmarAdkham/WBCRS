import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayScorecards } from "../../../actions/scorecardActions";
import { displayHistoryScorecard } from "../../../actions/scorecardActions";
import MaterialTableDemo from "../../elements/materialTable";
import HistoryScorecard from "../history-scorecard/HistoryScorecard";


class ScorecardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scorecardID: '',
      switchValue: 0 //this class contains two children. switchvalue is to switch between them (0 & 1)
    }
    this.switchViews = this.switchViews.bind(this);

  }
  componentDidMount() {
    const searchData = {
        obligorID: this.props.obligorID
    }
    console.log(searchData);
    this.props.displayScorecards(searchData);
  }

  switchViews(id, index) {
    this.props.removeParentBack(index===1 ? false : true);
    this.setState ({
      scorecardID: id,
      switchValue: index
    });
  }

  render() {
    console.log(this.props.scorecards);
    //columns for the table
    const columns = [
        { title: 'Date Created', field: 'dateCreated' },
        { title: 'Model', field: 'model' },
        { title: 'Score', field: 'value' },
    ];
    return (
      <div>
        {this.state.switchValue === 0 ? //First table will be shown
          <div className="container-fluid">
            <div className="row">
              <div className="col s10 offset-s1">
                <MaterialTableDemo
                  data={this.props.scorecards}
                  title="Scorecards"
                  columns={columns}
                  switchViews={this.switchViews}
                  navigate={this.props.handleNext}
                  />
              </div>
            </div>
          </div>
        : //If clicked Questions will be shown
          <HistoryScorecard scorecardID={this.state.scorecardID}  switchViews={this.switchViews} />
        }
      </div>
    )
  }
}

ScorecardList.propTypes = {
  displayScorecards: PropTypes.func.isRequired,
  displayHistoryScorecard: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  scorecards: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  scorecards: state.scorecard.scorecards,
  scorecard: state.scorecard.scorecard,
});

export default connect(
  mapStateToProps,
  { displayScorecards, displayHistoryScorecard }
)(withRouter(ScorecardList));
