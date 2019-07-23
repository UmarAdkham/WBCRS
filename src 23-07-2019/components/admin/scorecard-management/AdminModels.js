import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayModels, createModel } from "../../../actions/scorecardActions";
import MaterialTableDemo from "../../elements/materialTable";
//Dialog
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  button: {
    float: 'right',
  },
}));

function SimpleDialog(props) {
  const models = props.modelNames;
  const classes = useStyles();
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value) {
    console.log(value);
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Copy from the existing models?</DialogTitle>
      <List>
        {models.map((model, index) => (
          <ListItem button onClick={() => handleListItemClick(props.modelIDs[index])} key={model}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={model} />
          </ListItem>
        ))}

            <Button
                color="primary"
                className={classes.button}
                onClick={() => handleListItemClick("null")}
                >
                No, thanks
            </Button>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};

class AdminModels extends Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false,//Dialog state
          selectedValue: null, //default selected value for Dialog
      }
  }

  handleClickOpen = () => {
    console.log("open");
    this.setState ({
        open: true
    });
  }

  handleClose = value => {
    this.setState ({
        open: false,
        selectedValue: value
    });
  };

  componentWillMount() {
    this.props.displayModels();
  }

  onAdd = modelName => {
    const newModel = {
      name: modelName
    };
    this.props.createModel(newModel);
    setTimeout(() => {
      this.componentWillMount();
    }, 900);
  };


  render() {
    //columns for the table
    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Status', field: 'status',
        }               
    ];
    
    const modelNames = []; //Create array of model names to pass to Dialog
    const modelIDs = []; //Create array of model id to pass to Dialog
    this.props.models.map(element => {
        if(element.status === "Approved") { // Only approved models should be shown to be copied
            modelNames.push(element.name);
            modelIDs.push(element._id);
        }
    })

    if(this.state.selectedValue) { //To direct to the next step
        this.props.handleNext(this.state.selectedValue);
    }
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col s10 offset-s1">
              <MaterialTableDemo
                data={this.props.models}
                title="Admin Models"
                columns={columns}
                add={this.onAdd}
                openDialog={this.handleClickOpen}
                />
            </div>
          </div>
        </div>
        <SimpleDialog selectedValue={this.state.selectedValue} 
                      open={this.state.open} 
                      onClose={this.handleClose}
                      modelNames={modelNames}
                      modelIDs= {modelIDs} 
                      />
      </div>
    )
  }
}

AdminModels.propTypes = {
  displayModels: PropTypes.func.isRequired,
  createModel: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  models: state.scorecard.models,
});

export default connect(
  mapStateToProps,
  { displayModels, createModel }
)(withRouter(AdminModels));
