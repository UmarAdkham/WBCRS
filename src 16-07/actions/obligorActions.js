import axios from "axios";
import { GET_ERRORS, DISPLAY_INDUSTRIES, DISPLAY_OBLIGORS, DISPLAY_COUNTRIES } from "./types";

// Create Obligor
export const createObligor = (obligorData) => dispatch => {
  axios.post("/api/obligors/createObligor", obligorData)
    .then(res => {
      alert("Obligor added successfully");
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Display Obligors 
export const displayObligors = () => dispatch => {
    fetch("api/obligors/displayObligors")
    .then(res => res.json())
    .then(obligors => dispatch({
        type: DISPLAY_OBLIGORS,
        payload: obligors
    }));
}

//Create Industry
export const createIndustry = (industryData) => dispatch => {
  axios.post("api/obligors/createIndustry", industryData)
    .then(res => {}).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
};

//Display Industries
export const displayIndustries = () => dispatch => {
  fetch("api/obligors/displayIndustries")
  .then(res => res.json())
  .then(industries => dispatch({
      type: DISPLAY_INDUSTRIES,
      payload: industries
  }));
}

//Delete Industry
export const deleteIndustry = (industryData) => dispatch => {
  fetch("api/obligors/deleteIndustry", {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(industryData)
})
  .then(res => res.json()) // OR res.json()
  .then(res => console.log(res));
};

//Add Country
export const addCountry = (countryData) => dispatch => {
  axios.post("api/obligors/addCountry", countryData)
    .then(res => {}).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
};

//Display countries
export const displayCountries = () => dispatch => {
  fetch("api/obligors/displayCountries")
  .then(res => res.json())
  .then(countries => dispatch({
      type: DISPLAY_COUNTRIES,
      payload: countries
  }));
}

//Delete country
export const deleteCountry = (countryData) => dispatch => {
  fetch("api/obligors/deleteCountry", {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(countryData)
})
  .then(res => res.json()) // OR res.json()
  .then(res => console.log(res));
};
