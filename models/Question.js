const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },  
  model: {
    type: String,
    required: true
  }
});

module.exports = Question = mongoose.model("question", QuestionSchema);
