import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import "../Dashboards-css/admin.css";
import { Link} from "react-router-dom";


const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Fetch facility booking requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/facility-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Handle approval of a facility request
  const handleApproval = async (id) => {
    try {
      const response = await fetch(`/api/facility-requests/${id}/approve`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to approve request");
      }
      const updatedRequest = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "Approved" } : req
        )
      );
      alert("Request Approved!");
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Handle rejection of a facility request
  const handleRejection = async (id) => {
    try {
      const response = await fetch(`/api/facility-requests/${id}/reject`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to reject request");
      }
      const updatedRequest = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "Rejected" } : req
        )
      );
      alert("Request Rejected!");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      

      <main className="dashboard-content">
        <h1 className="dashboard-title">Welcome, Admin</h1>
        <p className="dashboard-subtitle">
          Manage the college system with transparency and efficiency.
        </p>

        {/* Widgets */}
        {/* <div className="dashboard-widgets">
          {/* Add Candidate Widget */}
          {/* <motion.div className="widget add-candidate" whileHover={{ scale: 1.05 }}>
            <h3>Add Candidates</h3>
            <p>Add new candidates for the upcoming elections.</p>
            <Link to="/admin-dashboard/add-candidate">Add Candidate</Link>
          // </motion.div> */} 

          {/* View Voting Results Widget
          <motion.div className="widget vote-results" whileHover={{ scale: 1.05 }}>
            <h3>View Voting Results</h3>
            <p>Monitor the live voting results.</p>
            <Link to="/admin-dashboard/vote-results">View Results</Link>
          </motion.div> */}

          {/* Facility Booking Requests Widget */}
          {/* <motion.div className="widget facility-requests" whileHover={{ scale: 1.05 }}>
            <h3>Facility Booking Requests</h3>
            <p>Manage facility booking requests from students.</p>
            <Link to="/admin-dashboard/facility-requests">Manage Requests</Link>
          </motion.div> */}

          {/* Manage Available Dates Widget */}
          {/* <motion.div className="widget available-dates" whileHover={{ scale: 1.05 }}>
            <h3>Manage Available Dates</h3>
            <p>Set and manage available dates for facility bookings.</p>
            <Link to="/admin-dashboard/available-dates">Manage Dates</Link>
          </motion.div> */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default AdminDashboard;