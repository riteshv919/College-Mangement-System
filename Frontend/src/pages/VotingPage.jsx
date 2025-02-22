import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/votingPage.css"; // Ensure styles are imported

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const studentEmail = localStorage.getItem("userEmail"); // Retrieve logged-in student's email

  useEffect(() => {
    axios.get("http://localhost:3001/api/candidates")
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error("Error fetching candidates:", err));

    // Check if user has already voted
    axios.post("http://localhost:3001/api/student/check-vote", { email: studentEmail })
      .then((res) => setHasVoted(res.data.hasVoted))
      .catch((err) => console.error("Error checking vote status:", err));
  }, [studentEmail]);

  const vote = async (candidateId) => {
    if (hasVoted) {
      toast.error("You have already voted.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/student/vote", { email: studentEmail, candidateId });
      toast.success("Vote cast successfully!");
      setHasVoted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error voting.");
    }
  };

  return (
    <div className="voting-container">
      <h2 className="voting-title">Vote for Your Preferred Candidate</h2>
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="candidate-card">
            <img src={candidate.imageUrl} alt={candidate.name} className="candidate-img" />
            <h3>{candidate.name}</h3>
            <p>{candidate.position}</p>
            <p className="vote-count">Votes: {candidate.votes}</p>
            <button className="vote-btn" onClick={() => vote(candidate._id)} disabled={hasVoted}>
              {hasVoted ? "Voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingPage;
