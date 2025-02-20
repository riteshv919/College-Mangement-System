const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/collegeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // 'student', 'faculty', 'admin'
});

const User = mongoose.model("User", UserSchema);

app.use(express.json());
app.use(cors());

// Regex pattern for strict SGGS email validation
const SGGS_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@sggs\.ac\.in$/;

/* 
============================
🔹 USER REGISTRATION ROUTE
============================
*/
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  if (!["student", "faculty"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Validate SGGS email format
  if (!SGGS_EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Invalid email format. Use an @sggs.ac.in email." });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* 
============================
🔹 USER LOGIN ROUTE
============================
*/
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Admin Hardcoded Authentication
    if (email === "admin@sggs.ac.in" && password === "admin123") {
      return res.status(200).json({
        message: "Admin login successful",
        user: { email, role: "admin", name: "Admin" },
      });
    }

    // ✅ Validate email format (@sggs.ac.in)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@sggs\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Use @sggs.ac.in" });
    }

    // ✅ Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
