import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIndustry, displayIndustries, deleteIndustry } from "../../actions/obligorActions";
import MaterialTableDemo from "../elements/materialTable";

class IndustryManagement extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      errors: {},
    };
  }

componentWillMount() {
    this.props.displayIndustries();
}

componentDidMount() {
  //Redirect Clerk from Register Clerk page
  if (this.props.auth.user.type ==='Clerk') {
    this.props.history.push("/dashboard");
  } 
}

onSubmit = industryName => {
    const newIndustry = {
      name: industryName
    };
    this.props.createIndustry(newIndustry);
    setTimeout(() => {
      this.componentWillMount();
    }, 900);
};

onDelete = industryName => {
    const theIndustry = {
      name: industryName
    };
    this.props.deleteIndustry(theIndustry);
    setTimeout(() => {
      this.componentWillMount();
    }, 900);
};

render() {
    //columns for the table
    const columns = [{ title: 'Industry name', field: 'name' }];
return (
  <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col s10 offset-s1">
          <MaterialTableDemo
            displayIndustries={this.componentWillMount}
            data={this.props.industries}
            title="Industries"
            columns={columns}
            add={this.onSubmit}
            delete={this.onDelete}/>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

IndustryManagement.propTypes = {
  createIndustry: PropTypes.func.isRequired,
  displayIndustries: PropTypes.func.isRequired,
  deleteIndustry: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  industries: state.element.industries,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createIndustry, displayIndustries, deleteIndustry }
)(withRouter(IndustryManagement));