const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "student", "faculty"], default: "student" },
  isVerified: { type: Boolean, default: true }, // Admin should be verified
});

// Create User Model
const User = mongoose.model("User", UserSchema);

// ✅ Function to Create Default Admin
const createDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@sggs.ac.in"; // Default email
    const adminPassword = "admin123"; // Default password

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new User({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isVerified: true,
      });

      await newAdmin.save();
      console.log("✅ Default Admin Created!");
    } else {
      console.log("⚠️ Admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

// Export User Model
module.exports = { User, createDefaultAdmin };
