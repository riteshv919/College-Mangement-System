const mongoose = require("mongoose");

const FacilityRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  facility: { type: String, required: true },
  date: { type: Date, required: true },
  purpose: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Default status is "Pending"
});

module.exports = mongoose.model("FacilityRequest", FacilityRequestSchema);