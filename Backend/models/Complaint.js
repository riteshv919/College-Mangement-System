const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);
