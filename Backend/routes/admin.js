const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();

// Add Candidate
router.post('/add-candidate', async (req, res) => {
  const { name } = req.body;
  const candidate = new Candidate({ name });
  await candidate.save();
  res.status(201).json(candidate);
});

// Get All Candidates
router.get('/candidates', async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

module.exports = router;