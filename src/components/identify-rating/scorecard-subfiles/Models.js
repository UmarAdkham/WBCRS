import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayModels } from "../../../actions/scorecardActions";
import MaterialTableDemo from "../../elements/materialTable";

class Models extends Component {

  componentWillMount() {
    this.props.displayModels();
  }

  render() {
    //columns for the table
    const columns = [
        { title: 'Name', field: 'name' }                  
    ];
    console.log(this.props.models);
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col s10 offset-s1">
              <MaterialTableDemo
                data={this.props.models}
                title="Models"
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

Models.propTypes = {
  displayModels: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  models: state.scorecard.models,
});

export default connect(
  mapStateToProps,
  { displayModels }
)(withRouter(Models));
