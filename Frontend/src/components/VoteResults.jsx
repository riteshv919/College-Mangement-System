import React, { useEffect, useState } from "react";
import axios from "axios";

const VoteResults = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/candidates")
      .then((response) => setCandidates(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="vote-results">
      <h2>Voting Results</h2>
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoteResults;