import React, { useState } from "react";
import axios from "axios";

const VoteForm = () => {
  const [studentId, setStudentId] = useState("");
  const [candidateId, setCandidateId] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/student/vote", {
        studentId,
        candidateId,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="vote-form">
      <h2>Cast Your Vote</h2>
      <form onSubmit={handleVote}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Candidate ID"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
          required
        />
        <button type="submit">Vote</button>
      </form>
    </div>
  );
};

export default VoteForm;