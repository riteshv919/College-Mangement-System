const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Student Dashboard Route (Only for students)
router.get("/student-dashboard", authenticateUser, authorizeRoles("student"), (req, res) => {
  res.json({ message: "Welcome to the Student Dashboard", user: req.user });
});

// ✅ Faculty Dashboard Route (Only for faculty)
router.get("/faculty-dashboard", authenticateUser, authorizeRoles("faculty"), (req, res) => {
  res.json({ message: "Welcome to the Faculty Dashboard", user: req.user });
});

module.exports = router;
