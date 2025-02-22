import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import "../Dashboards-css/admin.css"; // Ensure styles are imported

const AdminDashboardLayout = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet /> {/* This will render the admin pages */}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
