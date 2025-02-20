import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Forgot.css'; // Reusing the same styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP verification

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // Mock OTP

  const handleSendOtp = () => {
    if (email) {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      console.log(`OTP sent to ${email}: ${newOtp}`); // Mock sending OTP
      setStep(2);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      alert('OTP Verified! Redirecting to reset password...');
      setStep(3); // Proceed to reset password step
    } else {
      alert('Invalid OTP. Please try again.');
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
      {step === 1 && (
        <>
          <h2 className="auth-title">Forgot Password</h2>
          <p>Enter your email to receive a verification OTP.</p>
          <motion.div className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#1abc9c' }}
              whileTap={{ scale: 0.95 }}
              className="btn"
              onClick={handleSendOtp}
            >
              Send OTP
            </motion.button>
          </motion.div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="auth-title">Verify OTP</h2>
          <p>Enter the OTP sent to your email.</p>
          <motion.div className="auth-form">
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <motion.input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#1abc9c' }}
              whileTap={{ scale: 0.95 }}
              className="btn"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </motion.button>
          </motion.div>
        </>
      )}

      {step === 3 && <ResetPassword />}
    </motion.div>
  );
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      alert('Password Reset Successful! Redirecting to login...');
      window.location.href = '/login'; // Redirect to login page
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  return (
    <>
      <h2 className="auth-title">Reset Password</h2>
      <p>Enter a new password for your account.</p>
      <motion.div className="auth-form">
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <motion.input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <motion.input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#1abc9c' }}
          whileTap={{ scale: 0.95 }}
          className="btn"
          onClick={handleResetPassword}
        >
          Reset Password
        </motion.button>
      </motion.div>
    </>
  );
};

export default ForgotPassword;
