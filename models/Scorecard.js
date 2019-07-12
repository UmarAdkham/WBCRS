const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ScorecardSchema = new Schema({
  obligorID: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String,
    required: true
  },  
  model: {
    type: String,
    required: true
  },
  questionArray: {
    type: Array,
    default: null
  },  
  value: {
    type: Number,
    required: true
  }
});

module.exports = Scorecard = mongoose.model("scorecard", ScorecardSchema);
