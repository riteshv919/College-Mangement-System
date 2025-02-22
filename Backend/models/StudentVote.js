const mongoose = require("mongoose");

const StudentVoteSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true }
});

module.exports = mongoose.model("StudentVote", StudentVoteSchema);
