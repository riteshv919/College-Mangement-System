import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import NotFound from "./pages/notFound";
import StudentDashboardLayout from "./Dashboards/StudentDashboardLayout"; // ✅ FIXED IMPORT
import FacultyDashboard from "./Dashboards/faculty";
import AdminDashboardLayout from "./Dashboards/AdminDashboardLayout";
import AdminDashboard from "./Dashboards/AdminDashboard";
import FacilityRequestList from "./pages/FacilityRequestList";
import CampusBookingForm from "./pages/FacilityBooking";
// import AvailableDatesPage from "./pages/AvailableDatesPage";
import AddCandidateForm from "./components/AddCandidateForm";
import AnonymousComplaintForm  from "./pages/AnonymousComplaintForm.jsx"
import NotificationForm from "./pages/NotificationForm.jsx"
import Notification from "./pages/Notification.jsx"
import VoteResults from "./components/VoteResults";
import FacilityBooking from "./pages/FacilityBooking"
import Profile from "./pages/Profile.jsx"


const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const isDashboard = window.location.pathname.includes("dashboard");

  return (
    <>
      {isDashboard ? <DashboardNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<CampusBookingForm />} /> Default Page */}
          <Route index element={<Profile />} /> {/* Default page */}
          <Route path="profile" element={<Profile />} />
          <Route path="facility-booking" element={<FacilityBooking />} />
          <Route path="complaints" element={<AnonymousComplaintForm  />} />
          <Route path="notification" element={<Notification />} />
        </Route>

        {/* Faculty Routes */}
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute role="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard (Uses Layout) */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="facility-requests" element={<FacilityRequestList />} />
          <Route path="add-candidate" element={<AddCandidateForm />} />
          <Route path="vote-results" element={<VoteResults />} />
          <Route path="notification-form" element={<NotificationForm/>} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
};

export default App;
