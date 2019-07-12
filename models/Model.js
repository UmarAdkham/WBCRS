const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ModelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = Model = mongoose.model("model", ModelSchema);
