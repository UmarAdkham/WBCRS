import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayObligors } from "../../actions/obligorActions";
import MaterialTableDemo from "../elements/materialTable";

class FindObligor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.props.displayObligors();
  }

  componentDidMount() {
    //Redirect Clerk from Register Clerk page
    if (this.props.auth.user.type!=='Clerk') {
      this.props.history.push("/dashboard");
    }
    else {
      this.setState ({
        filtered: this.props.obligors
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.obligors
    });
  }

  //To be deleted
  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    if(e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.obligors;
      // Use .filter() to determine which items should be displayed
			// based on the search terms
      newList = currentList.filter(obligor => {
        const lc_name = obligor.name.toLowerCase();
        const lc_cifNo = obligor.cifNo.toLowerCase();
        const lc_country = obligor.country.toLowerCase();
        const lc_industry = obligor.industry.toLowerCase();
        const lc_clerkName = obligor.clerkName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        //return matched cases
        return (lc_name.includes(filter) || lc_cifNo.includes(filter) || 
                lc_industry.includes(filter) || lc_country.includes(filter) ||
                lc_clerkName.includes(filter));
      });
    } else {
      newList = this.props.obligors;
    }
    
    this.setState ({
      filtered: newList
    });
  }

  render() {
    //columns for the table
    const columns = [
                    { title: 'Name', field: 'name' },
                    { title: 'CIF No', field: 'cifNo' },
                    { title: 'Country', field: 'country' },
                    { title: 'Industry', field: 'industry' },
                    { title: 'Created by', field: 'clerkName' },
                    { title: 'Date Created', field: 'dateCreated' },                    
                  ];
    console.log(this.props.obligors);
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col s10 offset-s1">
              <MaterialTableDemo
                data={this.props.obligors}
                title="Obligors"
                columns={columns}
                //handlenext came from parent class IdentifyRating to navigate within app bar
                navigate={this.props.handleNext}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FindObligor.propTypes = {
  displayObligors: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  obligors: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  obligors: state.oblgr.obligors,
});

export default connect(
  mapStateToProps,
  { displayObligors }
)(withRouter(FindObligor));
