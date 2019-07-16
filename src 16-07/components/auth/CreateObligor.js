import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createObligor } from "../../actions/obligorActions";
import { displayIndustries } from "../../actions/obligorActions";
import { displayCountries } from "../../actions/obligorActions";
import ControlledOpenSelect from "../elements/select";

class CreateObligor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cifNo: "",
      country: "",
      industry: "",
      errors: {},
    };
  }

componentWillMount() {
  this.props.displayIndustries();
  this.props.displayCountries();
}

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
}

componentDidMount() {
  //Redirect Clerk from Register Clerk page
  if (this.props.auth.user.type!=='Clerk') {
    this.props.history.push("/dashboard");
  }
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    const newObligor = {
      name: this.state.name,
      cifNo: this.state.cifNo,
      country: this.state.country,
      industry: this.state.industry,
      clerkName: this.props.auth.user.name
    };
    this.props.createObligor(newObligor);
    setTimeout(() => {
        this.props.navigate(1);
    }, 900);
  };
onIndustryUpdate = value => {
  this.setState({
    industry: value
  });
}
onCountryUpdate = value => {
  this.setState({
    country: value
  });
  console.log(this.state.country);
}

render() {
    const { errors } = this.state;
return (
  <div>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register New Obligor</b>
              </h4>
              
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              {/* Name */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              
              {/* CIF No */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.cifNo}
                  error={errors.cifNo}
                  id="cifNo"
                  type="number"
                  min="10000000000"
                  maxLength="99999999999"
                  className={classnames("", {
                    invalid: errors.cifNo
                  })}
                />
                <label htmlFor="cifNo">CIF No</label>
                <span className="red-text">{errors.cifNo}</span>
              </div>
              
              {/* Country */}
              <div className="input-field col s12">
                <ControlledOpenSelect 
                  label = {'Country'}
                  name = {'country'}
                  dataToDisplay={this.props.countries}
                  onUpdate={this.onCountryUpdate}
                />
                <span className="red-text">{errors.country}</span>
              </div>

              {/* Industry */}
              <div className="input-field col s12">
                <ControlledOpenSelect 
                  label = {'Industry'}
                  name = {'industry'}
                  dataToDisplay={this.props.industries}
                  onUpdate={this.onIndustryUpdate}
                />
                <span className="red-text">{errors.industry}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
     </div>
    );
  }
}

CreateObligor.propTypes = {
  createObligor: PropTypes.func.isRequired,
  displayIndustries: PropTypes.func.isRequired,
  displayCountries: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  industries: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  industries: state.element.industries,
  countries: state.element.countries
});
export default connect(
  mapStateToProps,
  { createObligor, displayIndustries, displayCountries },
)(withRouter(CreateObligor));