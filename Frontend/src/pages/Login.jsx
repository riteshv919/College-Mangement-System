import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";  // Import axios
import "../styles/Login.css"; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { user } = response.data;
      login(user);

      // ✅ Redirect Admin Directly
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate(`/${user.role}-dashboard`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="auth-container"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="auth-title"
      >
        Welcome Back
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="auth-form"
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <motion.input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <div className="form-links">
          <a href="/forgot">Forgot Password?</a>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#1abc9c" }}
          whileTap={{ scale: 0.95 }}
          className="btn"
          type="submit"
        >
          Login
        </motion.button>
      </motion.form>

      <div className="auth-footer">
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </motion.div>
  );
};

export default Login;
