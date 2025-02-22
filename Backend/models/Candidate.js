const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Candidate image URL
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", CandidateSchema);
