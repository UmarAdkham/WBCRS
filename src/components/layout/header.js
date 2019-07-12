import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
	onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
	render() {
		return (
			<div className="navbar-fixed">
					<nav className="z-depth-0.1">
						<div className="nav-wrapper white my-navbar-class">
							<Link
								to="/"
								style={{
									fontFamily: "monospace"
								}}
								className="col s5 brand-logo left black-text"
							>
								<i className="large material-icons">blur_on</i>
								WBCRS
							</Link>
							<ul id="nav-mobile" className="right">
								<li>
									<Link to="/"
											onClick={this.onLogoutClick}
											className = "logout-button">
											<i className="material-icons right">arrow_forward</i>Log out
									</Link>
								</li>
							</ul>
						</div>
					</nav>
			  </div>
			);
	}
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { logoutUser }
)(Header);
