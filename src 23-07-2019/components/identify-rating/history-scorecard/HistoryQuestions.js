import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayHistoryScorecard, displayOptions } from "../../../actions/scorecardActions";
//Radio button imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


class HistoryQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scorecardID: '',
      values_array: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidUpdate(prevProps) {
    //prevProps.scorecard[0].questionArray !== this.props.scorecard[0].questionArray || 
    //Initiate empty array to fill it with questions values
    this.values_array = [];
    
    if(this.props.scorecard){
      this.props.scorecard[0].questionArray.map((element) => {
        //Create Object for each question containing question name to refer to it and value
        const value_object = {
          question_id: element.question_id,
          score: element.score,
          questionType: element.questionType
        };
        //Fill array with the objects
        this.values_array.push(value_object);
      });

      if(prevProps.scorecard){//Because in the initial renders it is null
        //Compare var array with state array. Only in initial render state array will have another
        //length. In addition if props are changed also copy the var array into it. And later use state array.
        if(prevProps.scorecard[0].questionArray !== this.props.scorecard[0].questionArray ||
          this.values_array.length > this.state.values_array.length) {
          this.setState ({
            values_array: this.values_array
          });
        }  
      }
    }  
  
  }

  componentDidMount() {
    console.log(this.state.values_array.length);
    //Make json format of the input, because on the back end it is referred as json format
    //These props are retrieved from HistoryTabs.js
    const searchData = {
      scorecardID: this.props.scorecardID
    };
    //Get the questions and options
    this.props.displayHistoryScorecard(searchData);
    this.props.displayOptions();
  }

  handleChange(event) {
   
    this.state.values_array.map(element => {
      //Loop through the whole array to look for the question name and give it the selected value
      if(element.question_id === event.target.name){
        element.score = event.target.value;
        //Just update the state again, otherwise it will not render
        this.setState ({
          values_array: this.state.values_array
        });
      }
    });
  }

  render() {
    console.log(this.state.values_array.length);
    //Initiate empty array to fill it with questions values
    this.questions = this.state.values_array.map((question) => {
      return (
      question.questionType === this.props.questionType ?
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
                                          label={option.value} />
                :
                  null
            ))}
              </RadioGroup>
            </FormControl>
        </div>
      :
        null
      )
    });
    return (
        <div>
          {this.questions}
        </div>
    )
  }
}

HistoryQuestions.propTypes = {
    displayHistoryScorecard: PropTypes.func.isRequired,
    displayOptions: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    scorecard: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scorecard: state.scorecard.scorecard,
    options: state.scorecard.options,
});

export default connect(
    mapStateToProps,
    { displayHistoryScorecard, displayOptions }
  )(withRouter(HistoryQuestions));
