const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  roomNo : Number,
  paitientId : String,
  occupied : Number,
  wardboy:String
})


module.exports = mongoose.model("Room",RoomSchema);
