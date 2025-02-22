require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const complaintRoutes = require("./routes/complaintRoutes");
const path = require("path");



// Import routes
const authRoutes = require("./routes/authRoutes");
const facilityRoutes = require("./routes/facilityRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes
app.use("/api/complaints", complaintRoutes);


mongoose.connect('mongodb://localhost:27017/studentPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Notification Schema
const notificationSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

// Create Notification Model
const Notification = mongoose.model('Notification', notificationSchema);

// POST endpoint to store notifications
app.post('/submit-notification', async (req, res) => {
  const { title, description } = req.body;

  try {
      const newNotification = new Notification({ title, description });
      await newNotification.save();
      res.status(201).json({ message: 'Notification saved successfully!' });
  } catch (error) {
      console.error('Error saving notification:', error);
      res.status(500).json({ message: 'Failed to save notification.' });
  }
});

// GET endpoint to fetch notifications
app.get('/notifications', async (req, res) => {
  try {
      const notifications = await Notification.find().sort({ date: -1 }); // Sort by date in descending order
      res.status(200).json(notifications);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
});

// ✅ Ensure MONGO_URI and MONGO_URI_FACILITY are defined
if (!process.env.MONGO_URI || !process.env.MONGO_URI_FACILITY) {
  console.error("❌ MONGO_URI or MONGO_URI_FACILITY is missing in .env file");
  process.exit(1);
}

// Connect to the first MongoDB database (for authentication)
const authDB = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authDB.on("connected", () => console.log("✅ Connected to Auth MongoDB"));
authDB.on("error", (err) => console.error("❌ Auth MongoDB Connection Error:", err));

// Connect to the second MongoDB database (for facility booking)
const facilityDB = mongoose.createConnection(process.env.MONGO_URI_FACILITY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

facilityDB.on("connected", () => console.log("✅ Connected to Facility MongoDB"));
facilityDB.on("error", (err) => console.error("❌ Facility MongoDB Connection Error:", err));

mongoose.connect('mongodb://localhost:27017/voting-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Pass the database connections to routes
app.use("/api/auth", authRoutes(authDB)); // Pass authDB to authRoutes
app.use("/api/facility", facilityRoutes(facilityDB)); // Pass facilityDB to facilityRoutes

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));