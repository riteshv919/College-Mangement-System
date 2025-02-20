import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../Dashboards-css/admin.css"; // External CSS file for styling

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext); // Get logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user authentication
    navigate("/login"); // Redirect to login page
  };

  const features = [
    { title: "Student Election System", description: "Secure online voting with live result tracking.", icon: "🗳️" },
    { title: "Automated Notifications", description: "Emails for student leave & health alerts.", icon: "📢" },
    { title: "Approval System", description: "Event & budget approvals with tracking.", icon: "✅" },
    { title: "Academic Integrity Tracking", description: "Public records for cheating incidents.", icon: "📜" },
    { title: "Anonymous Complaint System", description: "Moderated anonymous complaint submissions.", icon: "🕵️" },
    { title: "Budget Tracking", description: "Public financial records with proof uploads.", icon: "💰" },
    { title: "Restricted Access", description: "Only verified college members can use the system.", icon: "🔒" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
          {features.map((feature, index) => (
            <motion.li key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {feature.icon} {feature.title}
            </motion.li>
          ))}
        </ul>

        {/* 🔹 Logout Button */}
        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.1, backgroundColor: "#e74c3c" }}
          whileTap={{ scale: 0.9 }}
        >
          🚪 Logout
        </motion.button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1 className="dashboard-title">Welcome, Admin</h1>
        <p className="dashboard-subtitle">
          Manage the college system with transparency and efficiency.
        </p>

        {/* Feature Cards */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
