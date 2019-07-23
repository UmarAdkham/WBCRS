import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Navbar.css";
import { logoutUser } from "../../actions/authActions";
//Pages
import Register from "../auth/Register";
import IndustryManagement from "../admin/IndustryManagement";
import CountryManagement from "../admin/CountryManagement";
import CreateObligor from "../auth/CreateObligor";
import IdentifyRating from "../identify-rating/IdentifyRating";
import ScorecardManagement from "../admin/scorecard-management/ScorecardManagement";
//New Design imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//////

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function navigate(newValue) {
    setValue(newValue);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appbar}>
        <Tabs value={value} onChange={handleChange} className={classes.tabs}>
        <Tab label={props.user.type==='Admin' ? 'Register Clerk':'Create Obligor'} />
        <Tab label={props.user.type==='Admin' ? 'Industry Management':'Identify Rating'} />
        {props.user.type==='Admin' ? <Tab label="Country Management" />:null}
        {props.user.type==='Admin' ? <Tab label="Scorecard Management" />:null}
        </Tabs>
        <Button onClick={props.logout} className={classes.button} color="inherit">
          Log out<i className="material-icons right">arrow_forward</i>
        </Button>
        
      </AppBar>
      {/* Navigate to pages based on the user type */}
      {value === 0 && 
                  <TabContainer>{props.user.type==='Admin' ? <Register />:
                  <CreateObligor navigate={navigate}/>}</TabContainer>}
      {value === 1 && 
                  <TabContainer>{props.user.type==='Admin' ? <IndustryManagement />:
                  <IdentifyRating />}</TabContainer>}
      {value === 2 && props.user.type==='Admin' ? <TabContainer> <CountryManagement /></TabContainer>: null}
      {value === 3 && props.user.type==='Admin' ? <TabContainer> <ScorecardManagement /></TabContainer>: null}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

//CSS styles for header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    backgroundColor: "white",
    color: "black",
    width: "100%",
  },
  tabs: {

  },
  button: {
    position: "absolute",
    right: 0,
    height: "48px",
    marginLeft: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 0,
    fontSize: "12px",
  }
}));




class Dashboard extends Component {

onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
};
render() {
    const { user } = this.props.auth;
return (
      <SimpleTabs 
        user = {user}
        logout = {this.onLogoutClick}/>
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
  {logoutUser}
)(Dashboard);
