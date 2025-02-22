import React from "react";
import "../styles/StudentProfile.css"; // Ensure you import the scoped CSS

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <img src="/profile.jpg" alt="Profile" className="profile-img" />
          <h1>John Doe</h1>
          <p className="subtitle">Computer Science Engineering | Batch 2025</p>
          <p>Email: johndoe@example.com</p>
          <p>Phone: +1234567890</p>
          <button className="profile-btn">Edit Profile</button>
        </div>

        <div className="profile-card-info">
          <h2>Academic Details</h2>
          <p><strong>CGPA:</strong> 9.2</p>
          <p><strong>Completed Credits:</strong> 120</p>
        </div>

        <div className="profile-card-info">
          <h2>Extracurricular Activities</h2>
          <p><strong>Clubs:</strong> Member of Coding Club</p>
          <p><strong>Events:</strong> Volunteer at TechFest 2024</p>
        </div>

        <div className="profile-card-info">
          <h2>Achievements</h2>
          <p><strong>Competition:</strong> Won 1st place in Hackathon 2023</p>
          <p><strong>Research:</strong> Published Research Paper on AI</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
