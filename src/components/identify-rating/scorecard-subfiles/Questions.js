import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayQuestions, displayOptions } from "../../../actions/scorecardActions";
//Radio button imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      values_array: localStorage.getItem(this.props.questionType) ? JSON.parse(localStorage.getItem(this.props.questionType)) : [],
      buttonState: localStorage.getItem(4) ? false : true
    }
    this.handleChange = this.handleChange.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
  }


  componentDidUpdate() {
    //Initiate empty array to fill it with questions values
    this.values_array = [];
    this.questions = this.props.questions.map((question) => {
      //Create Object for each question containing question name to refer to it and value
      //value initially is null and to be updated when Radio Button is clicked
      const value_object = {
        question_id: question._id,
        score: null
      };
      //Fill array with the objects
      this.values_array.push(value_object);
    });

    //Compare var array with state array. Only in initial render state array will have another
    //length. Copy the var array into it. And later use state array.
    if(this.values_array.length > this.state.values_array.length) {
      this.setState ({
        values_array: this.values_array
      });
    }
  }

  componentDidMount() {
     //Make json format of the input, because on the back end it is referred as json format
    //These props are retrieved from Tabs.js
    const questionData = {
      type: this.props.questionType,
      model: this.props.modelID
    };
    //Get the questions and options
    this.props.displayQuestions(questionData);
    this.props.displayOptions();
  }

  handleChange(event) {
    //To count selected elements
    var valueCounter = 0;
    this.state.values_array.map(element => {
      //Loop through the whole array to look for the question name and give it the selected value
      if(element.question_id === event.target.name){
        element.score = event.target.value;
        //Just update the state again, otherwise it will not render
        this.setState ({
          values_array: this.state.values_array
        });
      }
      if(element.score === null) {
        valueCounter = valueCounter + 1;
      }
    });
    //If no question left with "null" value, meaning all RG are selected enable the next Tab
    if(valueCounter===0) {
      localStorage.setItem(this.props.questionType, JSON.stringify(this.state.values_array));
      console.log(localStorage.length);
      //This is the method from Tabs.js to enable the tab with the passed number
      this.props.changeTabState(this.props.questionType+1);
      //Enable calculate button when all the questions are answered
      if(this.props.questionType === 4) {
        this.setState ({
          buttonState: false
        });
      }
    }
  }

  calculateRating() {
    if(window.confirm('Make sure the values are selected correctly.\nProceed to calclation?')){
      let totalRating = 0;
      for(var i = 1; i <= 4; i++) {
        const subRating = 0;
        const arrays = JSON.parse(localStorage.getItem(i));
        console.log(arrays);
        arrays.map(element => {
          console.log(element.score);
          totalRating += parseInt(element.score);
        });
      }
      this.props.handleNext(totalRating);
      for(var i = 1; i <= 4; i++) {
        localStorage.removeItem(i);
      }
    }
  }


  render() {
    //Initiate empty array to fill it with questions values
    this.questions = this.state.values_array.map((question) => {
      return (
      <div key = {question.question_id}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{question.question_id}</FormLabel>
            <RadioGroup
              aria-label={question.question_id} 
              name={question.question_id}
              value={question.score}
              onChange={this.handleChange}>
                {this.props.options.map((option) => (
                    option.questionID === question.question_id ?
                      <FormControlLabel value={option.value} 
                                        control={<Radio color= "primary"
                                                />} 
                                        label={option.description} />
              :
                null
          ))}
            </RadioGroup>
          </FormControl>
      </div>)
    });
    return (
        <div>
          {this.questions}
          {this.props.questionType === 4 ?
              <Button variant="contained" color="primary"
                      disabled = {this.state.buttonState}
                      onClick = {this.calculateRating}
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}>
                Calculate
              </Button> 
          : 
              null 
          }
          
        </div>
    )
  }
}

Questions.propTypes = {
    displayQuestions: PropTypes.func.isRequired,
    displayOptions: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    questions: state.scorecard.questions,
    options: state.scorecard.options,
});

export default connect(
    mapStateToProps,
    { displayQuestions, displayOptions }
  )(withRouter(Questions));
