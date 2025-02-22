import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar"; // ✅ Import Sidebar
import "../styles/studentSidebar.css"; // ✅ Import styles

const StudentDashboardLayout = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <StudentSidebar onLogout={onLogout} /> {/* Sidebar remains visible */}
      <div className="dashboard-content">
        <h2>Welcome, Student</h2>
        <Outlet /> {/* ✅ Dynamically render the selected page */}
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
