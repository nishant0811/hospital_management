const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  Type: String,
  Specialization : Array,
  Name: String,
  Address: String,
  PhoneNum: Number,
  Qualification: String,
  Email: String,
  Pass: String,
  UserName:{
    type: String,
  }
})

module.exports = mongoose.model('employee',EmployeeSchema);
