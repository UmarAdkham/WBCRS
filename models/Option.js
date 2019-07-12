const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OptionSchema = new Schema({
  questionID: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },  
  value: {
    type: String,
    required: true
  }
});

module.exports = Option = mongoose.model("option", OptionSchema);
