import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/studentSidebar.css"; // Ensure styles are imported

const StudentSidebar = ({ onLogout }) => {
  const navigate = useNavigate(); // ✅ For redirecting after logout

  const handleLogout = () => {
    // ✅ Clear authentication data (adjust based on your setup)
    localStorage.removeItem("authToken"); // If using JWT stored in localStorage
    sessionStorage.removeItem("authToken"); // If using sessionStorage
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // If using cookies

    // ✅ Trigger additional logout logic if needed
    if (onLogout) {
      onLogout();
    }

    // ✅ Redirect to login page
    navigate("/login");
  };

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="sidebar-title">Student Dashboard</h2>
      <ul>
        <li><Link to="/student-dashboard/facility-booking">Facility Booking</Link></li>
        <li><Link to="/student-dashboard/complaints">Complaints</Link></li>
        <li><Link to="/student-dashboard/notification">Notifications</Link></li>
        <li><Link to="/student-dashboard/vote-results">View Voting Results</Link></li>
        <li><Link to="/student-dashboard/profile">Profile</Link></li>
      </ul>

      <motion.button
        className="logout-btn"
        onClick={handleLogout}
        whileHover={{ scale: 1.1, backgroundColor: "#e74c3c" }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSignOutAlt /> Logout
      </motion.button>
    </motion.aside>
  );
};

export default StudentSidebar;
