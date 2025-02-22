import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; // Import Auth Context
import "../styles/FacilityRequest.css";

const FacilityRequestList = () => {
  const { user } = useContext(AuthContext); // Get logged-in user details
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch facility booking requests when component mounts
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/facility/requests");
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };

    fetchRequests();
  }, []);

  // Handle Approve/Reject
  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:3001/api/facility/update/${id}`, { status });
      setRequests(requests.map(req => req._id === id ? { ...req, status } : req));
    } catch (error) {
      console.error("Error updating request", error);
    }
  };

  return (
    <div className="facility-request-container">
      <h2>Facility Booking Requests</h2>

      {requests.length === 0 ? (
        <p>No requests available</p>
      ) : (
        <div className="request-list">
          {requests.map((req) => (
            <motion.div 
              key={req._id} 
              className="request-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4>{req.facility} Booking</h4>
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Date:</strong> {req.date}</p>
              <p><strong>Purpose:</strong> {req.purpose}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <div className="actions">
                <motion.button
                  className="approve-btn"
                  onClick={() => handleAction(req._id, "Approved")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✅ Approve
                </motion.button>
                <motion.button
                  className="reject-btn"
                  onClick={() => handleAction(req._id, "Rejected")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ❌ Reject
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacilityRequestList;
