const mongoose = require("mongoose");

const PaitienSchema = mongoose.Schema({
  name :String,
  age : Number,
  phone : Number,
  add : String,
  prob : String,
  doc: String,
  room : Number,
  meds : Array,
  email : String,
  wardboy : String,
  pass : String,
  username:String,
  type : String,
})

module.exports = mongoose.model("Paitient",PaitienSchema);
