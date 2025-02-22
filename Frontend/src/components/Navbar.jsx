import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Quantum University
        </Link>

        {/* Hamburger Menu (Visible on Mobile) */}
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link to="/admissions" onClick={() => setMenuOpen(false)}>Admissions</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link to="/register" className="register-btn-nav" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
