const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

module.exports = (facilityDB) => {
  // Define the FacilityRequest schema
  const FacilityRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    facility: { type: String, required: true },
    date: { type: Date, required: true },
    purpose: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending, Approved, or Rejected
  });

  // Schema for available dates
  const AvailableDateSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
  });

  // Create models using facilityDB
  const FacilityRequest = facilityDB.model("FacilityRequest", FacilityRequestSchema);
  const AvailableDate = facilityDB.model("AvailableDate", AvailableDateSchema);

  /**
   * 📌 Submit a facility booking request
   */
  router.post("/book", async (req, res) => {
    try {
      const { name, email, facility, date, purpose } = req.body;
      const newRequest = new FacilityRequest({ name, email, facility, date, purpose });
      await newRequest.save();
      res.status(201).json({ message: "Request submitted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit request", error });
    }
  });

  /**
   * 📌 Get all facility booking requests (Admin View)
   */
  router.get("/api/facility-requests", async (req, res) => {
    try {
      const requests = await FacilityRequest.find();
      res.json(requests);  // ✅ Ensure you send JSON response
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requests", error });
    }
  });
  

  /**
   * 📌 Approve a facility booking request
   */
  router.put("/facility-requests/:id/approve", async (req, res) => {
    try {
      const updatedRequest = await FacilityRequest.findByIdAndUpdate(
        req.params.id,
        { status: "Approved" },
        { new: true }
      );
      res.status(200).json({ message: "Request approved", updatedRequest });
    } catch (error) {
      res.status(500).json({ message: "Failed to approve request", error });
    }
  });

  /**
   * 📌 Reject a facility booking request
   */
  router.put("/facility-requests/:id/reject", async (req, res) => {
    try {
      const updatedRequest = await FacilityRequest.findByIdAndUpdate(
        req.params.id,
        { status: "Rejected" },
        { new: true }
      );
      res.status(200).json({ message: "Request rejected", updatedRequest });
    } catch (error) {
      res.status(500).json({ message: "Failed to reject request", error });
    }
  });

  /**
   * 📌 Add available booking dates (Admin Only)
   */
  router.post("/available-dates", async (req, res) => {
    try {
      const { date } = req.body;
      const newDate = new AvailableDate({ date });
      await newDate.save();
      res.status(201).json({ message: "Available date added", newDate });
    } catch (error) {
      res.status(500).json({ message: "Failed to add date", error });
    }
  });

  /**
   * 📌 Get all available booking dates
   */
  router.get("/available-dates", async (req, res) => {
    try {
      const dates = await AvailableDate.find().sort({ date: 1 });
      res.status(200).json(dates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available dates", error });
    }
  });

  return router;
};
