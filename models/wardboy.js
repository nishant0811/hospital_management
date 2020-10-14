const mongoose = require("mongoose");

const WardboySchema = mongoose.Schema({
  username : String,
  name : String,
  roomNumber : Array,
  phone : Number,
})

module.exports = mongoose.model("Wardboy",WardboySchema);
