const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
  name:String,
  username : String,
  paitients : Array,
  specialization : Array,
  phone: Number
});

module.exports = mongoose.model("Doctor",DoctorSchema);
