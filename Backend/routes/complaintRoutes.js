const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

// Submit an anonymous complaint
router.post("/", async (req, res) => {
  try {
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({ subject, description });
    await newComplaint.save();

    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all complaints (for admin)
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
