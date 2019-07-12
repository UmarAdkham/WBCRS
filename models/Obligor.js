const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ObligorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cifNo: {
    type: String,
    required: true
  },  
  country: {
    type: String,
    required: true
  },  
  industry: {
    type: String,
    required: true
  },
  clerkName: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String,
    required: true
  }
});

module.exports = Obligor = mongoose.model("obligors", ObligorSchema);
