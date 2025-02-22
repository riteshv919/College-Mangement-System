import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", formData);
      setOtpSent(true);
      alert("OTP sent to your email. Please verify.");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/auth/verify-otp", {
        email: formData.email,
        otp,
      });
      alert("Email verified successfully! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {!otpSent ? (
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      ) : (
        <div className="otp-verification">
          <h2>Verify Email</h2>
          <p>Enter the OTP sent to your email.</p>
          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label>OTP</label>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </div>

          <button onClick={handleOtpVerify} className="register-btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;