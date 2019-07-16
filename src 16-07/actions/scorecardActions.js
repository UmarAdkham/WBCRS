import axios from "axios";
import { DISPLAY_SCORECARDS, DISPLAY_HISTORY_SCORECARD, DISPLAY_MODELS, DISPLAY_QUESTIONS, DISPLAY_OPTIONS, GET_ERRORS } from "./types";

//Display Scorecards 
export const displayScorecards = (scorecardData) => dispatch => {
  console.log(scorecardData);
  axios.post("api/scorecard/displayScorecards", scorecardData)
  .then(scorecards => dispatch({
      type: DISPLAY_SCORECARDS,
      payload: scorecards.data
  })).catch(err =>
      console.log("error")
  );
}

//Display Specific Scorecard 
export const displayHistoryScorecard = (scorecardData) => dispatch => {
  console.log(scorecardData);
  axios.post("api/scorecard/displayHistoryScorecard", scorecardData)
  .then(scorecards => dispatch({
      type: DISPLAY_HISTORY_SCORECARD,
      payload: scorecards.data
  })).catch(err =>
      console.log("error")
  );
}

//Display Questions 
export const createScorecard = (scorecardData) => dispatch => {
  console.log(scorecardData);
  axios.post("api/scorecard/createScorecard", scorecardData)
  .then(res => {
    alert("Scorecard registered successfully");
  }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
  );
}

//Display Models 
export const displayModels = () => dispatch => {
  axios.get("api/scorecard/displayModels")
  .then(models => dispatch({
      type: DISPLAY_MODELS,
      payload: models.data
  })).catch(err =>
      console.log("error")
  );
}

// Create Question. Not yet in the front-end yet
export const createQuestion = (questionData) => dispatch => {
  axios.post("/api/scorecard/createQuestion", questionData)
    .then(res => {
      alert("Question added successfully");
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Display Questions 
export const displayQuestions = (questionData) => dispatch => {
  axios.post("api/scorecard/displayQuestions", questionData)
  .then(questions => dispatch({
      type: DISPLAY_QUESTIONS,
      payload: questions.data
  })).catch(err =>
      console.log("error")
  );
}


export const displayOptions = () => dispatch => {
  axios.get("/api/scorecard/displayOptions")
    .then(options => dispatch({
      type: DISPLAY_OPTIONS,
      payload: options.data
    }))
    .catch(err =>
      console.log("error")
    );
};


