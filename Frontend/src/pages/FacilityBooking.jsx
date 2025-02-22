import React, { useState } from "react";
import axios from "axios";
import "../styles/facility.css";

const FacilityBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facility: "",
    date: "",
    purpose: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3001/api/facility/book", formData);
      setMessage("Request submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit request. Try again.");
    }
  };

  return (
    <div className="facility-booking-container">
      <h2>Book a Campus Facility</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Facility:</label>
          <select name="facility" value={formData.facility} onChange={handleChange} required>
            <option value="">Select Facility</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Conference Room">Conference Room</option>
            <option value="Sports Ground">Sports Ground</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Purpose:</label>
          <textarea name="purpose" value={formData.purpose} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default FacilityBooking;
