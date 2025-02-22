const express = require('express');
const Candidate = require('../models/Candidate');
const Voter = require('../models/Vote');
const router = express.Router();

// Vote for a Candidate
router.post('/vote', async (req, res) => {
  const { studentId, candidateId } = req.body;

  // Check if student has already voted
  const existingVote = await Voter.findOne({ studentId });
  if (existingVote) {
    return res.status(400).json({ message: 'You have already voted.' });
  }

  // Add vote
  const vote = new Voter({ studentId, candidateId });
  await vote.save();

  // Update candidate's vote count
  await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

  res.status(201).json({ message: 'Vote recorded successfully.' });
});

module.exports = router;