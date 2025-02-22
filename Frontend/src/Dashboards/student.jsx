import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBook, FaCalendarAlt, FaExclamationTriangle, FaUserCircle, FaSignOutAlt, FaVoteYea } from "react-icons/fa";
import "../Dashboards-css/student.css";

const StudentDashboard = () => {
  const { logout } = useContext(AuthContext); // Get logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear authentication
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <motion.aside
        className="sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="sidebar-title">Dashboard</h2>
        <ul>
          <li><Link to="/student-dashboard/facility-booking"><FaBook /> Facility Booking</Link></li>
          <li><Link to="/complaints"><FaExclamationTriangle /> Complaints</Link></li>
          <li><Link to="/schedule"><FaCalendarAlt /> Class Schedule</Link></li>
          <li><Link to="/profile"><FaUserCircle /> Profile</Link></li>
          <li><Link to="/student-dashboard/vote"><FaVoteYea /> Voting</Link></li>
        </ul>

        {/* 🔹 Logout Button */}
        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.1, backgroundColor: "#e74c3c" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaSignOutAlt /> Logout
        </motion.button>
      </motion.aside>

      {/* Main Dashboard */}
      <motion.main
        className="dashboard-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome, Student!</h1>
        
        <div className="dashboard-widgets">
          {/* Facility Booking */}
          <motion.div className="widget booking" whileHover={{ scale: 1.05 }}>
            <h3>Campus Facility Booking</h3>
            <p>Reserve library rooms, auditoriums, and sports complexes.</p>
            <Link to="/student-dashboard/facility-booking">Book Now</Link>
          </motion.div>

          {/* Complaints */}
          <motion.div className="widget complaint" whileHover={{ scale: 1.05 }}>
            <h3>Anonymous Complaint System</h3>
            <p>Submit anonymous complaints. Ensuring student privacy.</p>
            <Link to="/complaints">Submit</Link>
          </motion.div>

          {/* Class Schedule */}
          <motion.div className="widget schedule" whileHover={{ scale: 1.05 }}>
            <h3>Class Schedule</h3>
            <p>View and manage your daily class schedule.</p>
            <Link to="/schedule">View</Link>
          </motion.div>

          {/* Profile */}
          <motion.div className="widget profile" whileHover={{ scale: 1.05 }}>
            <h3>Profile & Settings</h3>
            <p>Update personal information & preferences.</p>
            <Link to="/profile">Edit</Link>
          </motion.div>

          {/* Voting */}
          <motion.div className="widget vote" whileHover={{ scale: 1.05 }}>
            <h3>Voting System</h3>
            <p>Cast your vote for the upcoming elections.</p>
            <Link to="/student-dashboard/vote">Vote Now</Link>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default StudentDashboard;