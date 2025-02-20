import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="hero-title"
        >
          Welcome to <span>Quantum University</span>
        </motion.h1>
        <p className="hero-subtitle">
          Empowering students with quality education, research, and state-of-the-art facilities.
        </p>

        <motion.div
          className="hero-image"
          // whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
          // transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <img src="/campus.png" alt="College Banner" className="home-banner" />
        </motion.div>
      </section>

      {/* Key Facilities */}
      <section className="facilities-section">
        <h2>Our Campus Facilities</h2>
        <div className="facilities-grid">
          {[
            {
              title: "Modern Research Labs",
              desc: "Equipped with the latest technology for innovation and scientific research.",
            },
            {
              title: "Digital Library",
              desc: "Access thousands of books, research papers, and e-resources anytime.",
            },
            {
              title: "Sports & Ground Booking",
              desc: "Multiple courts and fields available for students and tournaments.",
            },
            {
              title: "Student Clubs & Societies",
              desc: "Join various student-led clubs, from tech to arts and culture.",
            },
          ].map((facility, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="facility-card"
            >
              <h3>{facility.title}</h3>
              <p>{facility.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Admissions Info */}
      <section className="admissions-section">
        <h2>Admissions Now Open!</h2>
        <p>
          Secure your future with a world-class education. Explore our diverse programs and apply today.
        </p>
        <motion.div whileHover={{ scale: 1.1 }} className="cta-buttons">
          <Link to="/register" className="cta-btn primary-btn">
            Apply Now
          </Link>
          <Link to="/contact" className="cta-btn secondary-btn">
            Contact Us
          </Link>
        </motion.div>
      </section>

      {/* Career & Placements */}
      <section className="careers-section">
        <h2>Career Support & Placements</h2>
        <p>
          We provide 100% placement assistance, career counseling, and internship opportunities with top firms.
        </p>
        <motion.div
          className="career-logos"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <img src="/Microsoft.png" alt="Company 1" className="company"/>
          <img src="/Amazon.png" alt="Company 2" className="company" />
          <img src="/Google.png" alt="Company 3" className="company"/>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
