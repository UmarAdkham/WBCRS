import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { displayQuestions, displayOptions } from "../../../actions/scorecardActions";
import SimpleSnackbar from "../../elements/Snackbars";

//Radio button imports
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';



class AdminQuestions extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      values_array: localStorage.getItem("q" + this.props.questionType) ? 
                      JSON.parse(localStorage.getItem("q" + this.props.questionType)) 
                    :
                      [], //Questions
      options_array: localStorage.getItem("opt" + this.props.questionType) ? 
                      JSON.parse(localStorage.getItem("opt" + this.props.questionType)) 
                    :
                      [], //Options
      snackbar: false,
      buttonState: localStorage.getItem(4) ? false : true,
      additionalOptions: []
    }
    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
   //Make json format of the input, because on the back end it is referred as json format
   //These props are retrieved from Tabs.js
   console.log(this.props.model);
   if(this.props.model!="null"){
      const questionData = {
        type: this.props.questionType,
        model: this.props.model
      };
      //Get the questions and options
      this.props.displayQuestions(questionData);
      this.props.displayOptions();
    }
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.questionType + " : " + this.props.questionType);
    if(!localStorage.getItem("q" + this.props.questionType) && !localStorage.getItem("opt" + this.props.questionType)) {
      if(this.props.model!="null") {
          //Initiate empty array to fill it with questions values
          let values_array = [];
          let options_array = [];
          this.props.questions.map((question) => {
            //Create Object for each question containing question name to refer to it and value
            //value initially is null and to be updated when Radio Button is clicked
            const value_object = {
              question_id: question._id,
              description: question.description,
              score: null,
              questionType: this.props.questionType
            };
            //Fill array with the objects
            values_array.push(value_object);
            this.props.options.map((option) => {
              if (option.questionID === question._id) {
                const option_object = {
                  id: option._id,
                  questionID: question._id,
                  description: option.description,
                  value: option.value
                };
                options_array.push(option_object);
              }
            });
          });

          if(prevProps.questions !== this.props.questions || prevProps.options !== this.props.options) {
            console.log("Updated");
            this.setState ({
              values_array: values_array,
              options_array: options_array
            });
          }
      }
    }
  }

  handleQuestionChange(event) { //fired when question is changed
    let values_array = [...this.state.values_array];
    values_array.map(question => {
      if(question.question_id === event.target.name){
        question.description = event.target.value;
        this.setState ({
          values_array: values_array
        });
      }
    });
  }

  handleOptionChange(event) { //fired when option desc or val is changed
    let options_array = [...this.state.options_array];
    options_array.map(option => {
      if("desc" + option.id === event.target.name) {
        option.description = event.target.value;
        this.setState ({
          options_array: options_array
        });
      }
      else if("val" + option.id === event.target.name) {
        option.value = event.target.value;
        this.setState ({
          options_array: options_array
        });
      }
    });
  }

  addQuestion() {
    const index = Math.floor(Math.random() * 1000) + 1; // returns a random integer from 1 to 1000 
    console.log(index);
    this.setState(prevState => ({ //add question Object with default attributes
      values_array: [...prevState.values_array, { question_id: index, //make a temporary id
                                                  description: '',
                                                  score: null,
                                                  questionType: this.props.questionType }]
    })) 
    for(var i=0; i<2; i++) { //Add two options by default
      this.setState(prevState => ({ //add option Object with default attributes
        options_array: [...prevState.options_array, { questionID: index,
                                                      description: '',
                                                      value: null  }], 
      })) 
    }
  }

  addOption(question_id) {
    this.setState(prevState => ({ //add option Object with default attributes
      options_array: [...prevState.options_array, { questionID: question_id,
                                                    description: '',
                                                    value: null  }], 
    })) 
  }

  removeQuestion(index){
    let questions = [...this.state.values_array];
    const questionID = questions[index].question_id;
    questions.splice(index, 1);
    this.setState({ values_array: questions });
    this.openSnackbar();//feedback
    this.setState(prevState => ({ // remove options forr that question
      options_array: prevState.options_array.filter(option => option.questionID !== questionID)
  }));
  }
 
  removeOption(index){
    let options = [...this.state.options_array];
    options.splice(index, 1);
    this.setState({ options_array: options });
    this.render();
  }

  openSnackbar() {
    this.setState({ snackbar: true });
  }

  closeSnackbar() {
    this.setState ({ snackbar: false });
  }

  handleNext(event) {
    localStorage.setItem("q" + this.props.questionType, JSON.stringify(this.state.values_array));
    localStorage.setItem("opt" + this.props.questionType, JSON.stringify(this.state.options_array));
    this.props.changeTabState(this.props.questionType + 1);
    this.props.handleChange(event, this.props.questionType);
  }


  render() {
    console.log(this.state.values_array);
    this.questions = this.state.values_array.map((question, index) => {
      return (
        <div key = {question.question_id}>
          
          <FormControl component="fieldset" style={{width: '100%', display: 'inline'}}>
            {/* Question text field */}
            <Tooltip title="Remove Question">
              <Button onClick={() => this.removeQuestion(index)}
                      variant="contained"
                      color="secondary"
                      style={{
                        fontSize: '9px',
                        float: 'right'
                      }}>
                      <DeleteIcon/>
              </Button>
            </Tooltip>
            <span style= {{padding:9, width: '5%'}}>Question {index + 1}:</span>
            <input type="text"
                    onChange={this.handleQuestionChange}
                    name={question.question_id}
                    defaultValue={question.description}
                    placeholder="Enter question"
                    inputProps={{color: 'black', fontSize:'20px'}}
                    style= {{width: '70%', color: 'black', fontSize: '20px'}}
                      />
            {/* End Question text field */}

                {this.state.options_array.map((option, i) => (
                    option.questionID === question.question_id ? //to show only the question's options
                      <div key={option.id} style={{marginTop: '20px'}}>
                        {/* Option description and value text field*/}
                        <span style= {{padding:9}}>Option: </span>
                        <TextField type="text" 
                                   name={"desc" + option.id} //add "desc" to differentiate from val
                                   onChange={this.handleOptionChange}
                                   defaultValue={option.description} 
                                   placeholder="Enter option" />
                        <span style= {{marginLeft: '100px', padding:9}}>Value:</span>
                        <TextField type="number"
                                  name={"val"+option.id} //add "val" to differentiate from desc
                                  onChange={this.handleOptionChange}
                                  defaultValue={option.value}
                                  placeholder="0"
                                  style= {{marginLeft: '10px', marginRight: '20px'}}
                                  inputProps={{ min: "1", max: "20", step: "1" }} />
                        {/* End Option description and value text field*/}
                        <Tooltip title="Remove Option">
                          <Button onClick={() => this.removeOption(i)}
                                  color="secondary"
                                  style={{
                                    fontSize: '9px',
                                    marginLeft: '20px'
                                  }}>
                                    <DeleteIcon />
                          </Button>
                        </Tooltip>

                      </div>
                    :
                      null 
                      /* 5d0b4e0002c7f3aeceb092ca : Adkhamov
                            5d1088075c624921497c7f20 : Beltepa
                            5d0b4d0f02c7f3aeceb092c9: Akmal
                            5d0b4e0002c7f3aeceb092ca: Ikrom
                            5d0b4d0f02c7f3aeceb092c9: Erkinov*/
          ))}
          </FormControl>
          <Tooltip title="Add Option">
            <Button onClick={() => this.addOption(question.question_id)}
                    color="primary"
                    variant="outlined"
                    style={{
                      fontSize: '9px',
                      marginLeft: '292px',
                      marginTop: '30px',
                      paddingRight: '0px',
                      paddingLeft: '0px'
                    }}>
                      <AddIcon />
            </Button>
          </Tooltip>
            {/* Separator after each question*/}
            <hr style = {{
                  marginBottom: index===this.state.values_array.length-1 ? '7px' : '30px',
                  marginTop: '30px',
                  height: '30px',
                  border: 'none',
                  backgroundColor:'rgba(235,235,235,1)' 
                  }} />
        </div>)
    });

    //Real return()
    return (
        <div>
          {this.state.values_array.length > 0 ? 
              this.questions 
            :
              <p style={{textAlign: 'center'}}> No questions here yet </p>
          }
          <Tooltip title="Add Question">
            <Button onClick={() => this.addQuestion()}
                    color="primary"
                    variant="contained"
                    className="QuestionBtn"
                    style={{
                      marginTop: '30px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      display: 'block'
                    }}>
                      <AddIcon />
            </Button>
          </Tooltip>
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
              <Button variant="contained" color="primary"
                      onClick = {(event) => this.handleNext(event)}
                      className="QuestionBtn"
                      style={{
                        marginTop: "1rem",
                        float: 'right'
                      }}>
                Next
              </Button> 
          }
          {/*Pop up from corner*/}
          <SimpleSnackbar currentState={this.state.snackbar} 
                          closeSnackbar={this.closeSnackbar} 
                          text="Question removed"
                          />
        </div>
    )
  }
}

AdminQuestions.propTypes = {
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
  )(withRouter(AdminQuestions));
