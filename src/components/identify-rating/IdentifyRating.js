import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScorecardList from "./scorecard-subfiles/ScorecardList";
import Scorecard from "./Scorecard";
import Models from "./scorecard-subfiles/Models";
import FinalRating from "./scorecard-subfiles/FinalRating";
import FindObligor from "./FindObligor";
import { createScorecard } from "../../actions/scorecardActions";



const useStyles = makeStyles(theme => ({
  stepper: {
    width: '90%',
    marginLeft: '5%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  //Selected model and obligor
  const [modelID, setModelID] = React.useState();
  const [modelName, setModelName] = React.useState();
  const [obligorID, setObligorID] = React.useState();
  const [obligorName, setObligorName] = React.useState();
  const [rating, setRating] = React.useState();

  function getSteps() {
    //Names of the menu options. Does not have to be the same with the file name
    return ['Find Obligor', 'Scorecard', 'Model', 'Questions', 'Final Score'];
  } 

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FindObligor handleNext={handleNext}/>;
      case 1:
        return <ScorecardList obligorID={obligorID} handleNext={handleNext}/>;
      case 2:
        return <Models handleNext={handleNext}/>;
      case 3:
        return <Scorecard modelID={modelID} handleNext={handleNext}/>;
      case 4:
        return <FinalRating rating={rating} model={modelName} obligor={obligorName}/>;
      default:
        return 'Unknown step';
    }
  } 


  function handleNext(data, name) {
    //Setting obligor, model data as state, based on the active step
    if(activeStep===0) {
      setObligorID(data);
      setObligorName(name);
    } 
    else if (activeStep === 2) {
      setModelID(data);
      setModelName(name);
    }
    else if (activeStep === 3) {
      setRating(data);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    //If the current page is Questions page warn the user and then clear localStorage.
    if(activeStep===3) {
      if(window.confirm("Changes you made may not be saved")) {
        let length = localStorage.length;
        for(var i = 1; i <= length; i++) {
          if(localStorage.getItem(i)) {
            localStorage.removeItem(i);
          }
        }
        setActiveStep(prevActiveStep => prevActiveStep - 1);
      }
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  }

  function handleReset() {
    setActiveStep(0);
  }

  function onSubmit (e) {
    e.preventDefault();
    const newScorecard = {
          obligorID: {obligorID},
          model: {modelName},
          value: 14
        };
    props.createScorecard(newScorecard); 
  };

  return (
    <div>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Scorecard is saved successfully!
            </Typography>
            <Button color='primary' onClick={handleReset} className={classes.button}>
              OK
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              {activeStep !== 4 ?
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
              :
                  null
              }

              {activeStep === 4 ?
                  <div>
                    <Button 
                      onClick={handleReset} 
                      className={classes.button}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onClick={onSubmit}
                      className={classes.button}
                    >
                      Approve
                    </Button>
                  </div>
              :
                  null
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

class IdentifyRating extends Component {
    render() {
        return <HorizontalLinearStepper createScorecard={this.props.createScorecard}/>;
    }
}

IdentifyRating.propTypes = {
  createScorecard: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { createScorecard }
)(withRouter(IdentifyRating));


