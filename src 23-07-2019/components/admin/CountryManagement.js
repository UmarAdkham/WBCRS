import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCountry, displayCountries, deleteCountry } from "../../actions/obligorActions";
import MaterialTableDemo from "../elements/materialTable";

class CountryManagement extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      errors: {},
    };
  }

componentWillMount() {
    this.props.displayCountries();
}

componentDidMount() {
  //Redirect Clerk from Register Clerk page
  if (this.props.auth.user.type ==='Clerk') {
    this.props.history.push("/dashboard");
  } 
}

onSubmit = countryName => {
    const newCountry = {
      name: countryName
    };
    this.props.addCountry(newCountry);
    setTimeout(() => {
      this.componentWillMount();
    }, 900);
};

onDelete = countryName => {
    const theCountry = {
      name: countryName
    };
    this.props.deleteCountry(theCountry);
    setTimeout(() => {
      this.componentWillMount();
    }, 900);
};

render() {
    //columns for the table
    const columns = [{ title: 'Country name', field: 'name' }];
return (
  <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col s10 offset-s1">
          <MaterialTableDemo
            displayIndustries={this.componentWillMount}
            data={this.props.countries}
            title="Countries"
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

CountryManagement.propTypes = {
  addCountry: PropTypes.func.isRequired,
  displayCountries: PropTypes.func.isRequired,
  deleteCountry: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  countries: state.element.countries,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addCountry, deleteCountry, displayCountries }
)(withRouter(CountryManagement));