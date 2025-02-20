import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Dashboards-css/Student-Navbar.css";

const DashboardNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-navbar"
    >
      <div className="dashboard-navbar-container">
        <Link to="#" className="dashboard-navbar-logo">Dashboard</Link>
        <div className="dashboard-navbar-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard/bookings">Facility Booking</Link>
          <Link to="/dashboard/complaints">Complaints</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;
