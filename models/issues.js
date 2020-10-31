const mongoose= require("mongoose");

const IssueSchema = new mongoose.Schema({
  issue: String,
  status: Number
});

module.exports = mongoose.model('issues',IssueSchema);
