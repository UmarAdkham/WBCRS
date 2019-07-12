import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayScorecards } from "../../../actions/scorecardActions";
import MaterialTableDemo from "../../elements/materialTable";

class ScorecardList extends Component {
  componentWillMount() {
    const obligorData = {
        obligorID: this.props.obligorID
    }
    console.log(obligorData);
    this.props.displayScorecards(obligorData);
  }

  render() {
    console.log(this.props.scorecards);
    //columns for the table
    const columns = [
        { title: 'Date Created', field: 'dateCreated' },
        { title: 'Model', field: 'questionArray' },
        { title: 'Score', field: 'value' },
    ];
    console.log(this.props.scorecards.questionArray);
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col s10 offset-s1">
              <MaterialTableDemo
                data={this.props.scorecards}
                title="Scorecards"
                columns={columns}
                navigate={this.props.handleNext}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ScorecardList.propTypes = {
  displayScorecards: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  scorecards: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  scorecards: state.scorecard.scorecards,
});

export default connect(
  mapStateToProps,
  { displayScorecards }
)(withRouter(ScorecardList));
