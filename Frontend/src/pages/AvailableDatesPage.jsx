import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../Dashboards-css/admin.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";  



const AvailableDatesPage = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available dates for facilities
    fetch("/api/available-dates")
      .then((res) => res.json())
      .then((data) => setAvailableDates(data))
      .catch((err) => console.error("Error fetching available dates:", err));
  }, []);

  const handleAddAvailableDate = () => {
    if (newAvailableDate) {
      fetch("/api/available-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newAvailableDate }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAvailableDates([...availableDates, data]);
          setNewAvailableDate("");
          alert("Date added successfully!");
        })
        .catch((err) => console.error("Error adding date:", err));
    }
  };

  const handleDeleteAvailableDate = (id) => {
    fetch(`/api/available-dates/${id}`, { method: "DELETE" })
      .then(() => {
        setAvailableDates(availableDates.filter((date) => date.id !== id));
        alert("Date deleted successfully!");
      })
      .catch((err) => console.error("Error deleting date:", err));
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
          <li onClick={() => navigate("/admin")}>
            🏫 Facility Booking Requests
          </li>
          <li>📅 Manage Available Dates</li>
          <li>🗳️ Student Election System</li>
          <li>📢 Automated Notifications</li>
          <li>✅ Approval System</li>
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

      <main className="dashboard-content">
        <h1 className="dashboard-title">Manage Available Dates</h1>
        <p className="dashboard-subtitle">
          Add or remove available dates for facility bookings.
        </p>

        <div className="available-dates">
          <label>
            Add New Available Date:
            <input
              type="date"
              value={newAvailableDate}
              onChange={(e) => setNewAvailableDate(e.target.value)}
            />
          </label>
          <motion.button
            className="add-date-btn"
            onClick={handleAddAvailableDate}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ➕ Add Date
          </motion.button>

          <ul className="date-list">
            {availableDates.map((date) => (
              <li key={date.id} className="date-item">
                <span>{date.date}</span>
                <motion.button
                  className="delete-date-btn"
                  onClick={() => handleDeleteAvailableDate(date.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  🗑️ Delete
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AvailableDatesPage;
