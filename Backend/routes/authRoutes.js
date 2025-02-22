require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ SGGS Email Validation
const SGGS_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@sggs\.ac\.in$/;

// Export the router with authDB connection
module.exports = (authDB) => {
  // Define the User schema
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty"], required: true },
  });

  // Create the User model using authDB
  const User = authDB.model("User", UserSchema);

  // ✅ User Registration
  router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      // ✅ Admin Default Account Check
      if (email === "admin@sggs.ac.in") {
        return res.status(400).json({ message: "Admin account already exists. Use default login." });
      }

      // ✅ Validate Email Format
      if (!SGGS_EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: "Invalid email format. Use @sggs.ac.in" });
      }

      // ✅ Validate Role
      if (!["student", "faculty"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      // ✅ Check if User Exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already registered" });

      // ✅ Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Save User
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // ✅ User Login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      // ✅ Admin Hardcoded Login
      if (email === "admin@sggs.ac.in" && password === "admin123") {
        return res.status(200).json({ message: "Admin login successful", user: { email, role: "admin", name: "Admin" } });
      }

      // ✅ Validate Email
      if (!SGGS_EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: "Invalid email format. Use @sggs.ac.in" });
      }

      // ✅ Find User
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found. Please register first." });

      // ✅ Compare Passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  return router;
};