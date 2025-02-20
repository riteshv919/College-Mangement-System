const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to check authentication
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Store user info in request object
    next(); // Continue execution
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

// Protected route example
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}!`, user: req.user });
});

module.exports = router;
