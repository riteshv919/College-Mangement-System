import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { motion } from "framer-motion";
import "../Dashboards-css/admin.css"; // Import styles

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    // ✅ Clear authentication data (Adjust based on your auth setup)
    localStorage.removeItem("authToken"); // If using JWT stored in localStorage
    sessionStorage.removeItem("authToken"); // If using sessionStorage
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // If using cookies

    // ✅ Trigger additional logout logic if needed (e.g., API call)
    if (onLogout) {
      onLogout();
    }

    // ✅ Redirect to login page
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin-dashboard/facility-requests">Facility Booking Requests</Link>
        </li>
        <li>
          <Link to="/admin-dashboard/add-candidate">Add Candidates</Link>
        </li>
        <li>
          <Link to="/admin-dashboard/vote-results">View Voting Results</Link>
        </li>
        <li><Link to="/admin-dashboard/notification-form">Add Notification</Link></li>
        <li>🕵️ Anonymous Complaint System</li>
        <li>💰 Budget Tracking</li>
      </ul>

      <motion.button
        className="logout-btn"
        onClick={handleLogout}
        whileHover={{ scale: 1.1, backgroundColor: "#e74c3c" }}
        whileTap={{ scale: 0.9 }}
      >
        🚪 Logout
      </motion.button>
    </aside>
  );
};

export default Sidebar;
