import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Navbar.css";
import Headerr from "../layout/header";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";


class Dashboard extends Component {
  
render() {
    const { user } = this.props.auth;
return (
      <div>
       <Headerr />
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Good day,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into a Web-Based Credit Rating System as {user.type}
                </p>
              </h4>
              <Link to={user.type==='Clerk' ? '/createObligor': '/register'}>
                <button
                  style={{
                    width: "215px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginRight: "10px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register {user.type==='Clerk' ? 'Obligor':'Clerk'}
                </button>
              </Link>
              <Link to={user.type==='Clerk' ? '/findObligor': '/industryManagement'}>
                <button
                  style={{
                    width: "235px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                   {user.type==='Clerk' ? 'Identify Rating':'Manage Industries'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
