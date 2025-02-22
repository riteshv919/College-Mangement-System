import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/candidates")
      .then((response) => setCandidates(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="candidate-list">
      <h2>Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            {candidate.name} - Votes: {candidate.votes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;