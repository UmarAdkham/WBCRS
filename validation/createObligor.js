const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateObligorInput(data){
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.cifNo = !isEmpty(data.cifNo) ? data.cifNo : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.industry = !isEmpty(data.industry) ? data.industry : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // cifNo checks
  if (Validator.isEmpty(data.cifNo)) {
    errors.cifNo = "CIF No field is required";
  }else if (!Validator.isNumeric(data.cifNo)) {
    errors.cifNo = "CIF No should be numeric";
  }
  //Country check
  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  } 
  //Industry check
  if (Validator.isEmpty(data.industry)) {
    errors.industry = "Industry field is required";
  }
  return {
  	errors,
  	isValid: isEmpty(errors)
  };
};