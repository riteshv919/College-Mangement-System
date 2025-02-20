import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentDashboard from "./Dashboards/student";
import FacultyDashboard from "./Dashboards/faculty";
import AdminDashboard from "./Dashboards/AdminDashboard.jsx";
import NotFound from "./pages/notFound";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const isDashboard = window.location.pathname.includes("dashboard"); // Check if the route is for a dashboard

  return (
    <>
      {/* Show Dashboard Navbar only on dashboard pages, otherwise show regular Navbar */}
      {isDashboard ? <DashboardNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Protected Routes Based on Role */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute role="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-All - 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Show Footer only if not on a dashboard */}
      {!isDashboard && <Footer />}
    </>
  );
};

export default App;
