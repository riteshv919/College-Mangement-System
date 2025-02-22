import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPaperPlane, FaFileUpload } from "react-icons/fa";
import "../styles/anonymousComplaintForm.css"; // ✅ External CSS

const AnonymousComplaintForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("complaintType", data.complaintType);
      formData.append("description", data.description);
      if (data.attachment[0]) {
        formData.append("attachment", data.attachment[0]);
      }

      // Simulate API Call
      setTimeout(() => {
        console.log("Complaint Submitted:", data);
        setSubmissionStatus("success");
        reset(); // Reset form after successful submission
      }, 1000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="complaint-container">
      <h2 className="complaint-title">🕵️ Anonymous Complaint Form</h2>
      <p className="complaint-description">Your complaint will be submitted anonymously and reviewed by the administration.</p>

      {submissionStatus === "success" && <p className="success-message">✅ Complaint submitted successfully!</p>}
      {submissionStatus === "error" && <p className="error-message">❌ Failed to submit. Try again.</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="complaint-form">
        {/* Complaint Type */}
        <div className="form-group">
          <label>Complaint Type:</label>
          <select {...register("complaintType", { required: "Please select a complaint type" })} className="form-input">
            <option value="">Select Type</option>
            <option value="Harassment">Harassment</option>
            <option value="Academic">Academic Issue</option>
            <option value="Facilities">Facilities & Maintenance</option>
            <option value="Other">Other</option>
          </select>
          {errors.complaintType && <p className="error-text">{errors.complaintType.message}</p>}
        </div>

        {/* Complaint Description */}
        <div className="form-group">
          <label>Complaint Description:</label>
          <textarea {...register("description", { required: "Please enter your complaint", minLength: { value: 10, message: "Minimum 10 characters required" } })} rows="4" className="form-input" placeholder="Describe your complaint..."></textarea>
          {errors.description && <p className="error-text">{errors.description.message}</p>}
        </div>

        {/* File Attachment */}
        <div className="form-group">
          <label className="file-label">
            <FaFileUpload /> Attach File (Optional):
          </label>
          <input type="file" {...register("attachment")} className="form-input" />
        </div>

        {/* Submit Button */}
        <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <FaPaperPlane /> Submit Complaint
        </motion.button>
      </form>
    </div>
  );
};

export default AnonymousComplaintForm;
