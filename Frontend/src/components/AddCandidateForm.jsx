import React, { useState } from "react";
import axios from "axios";

const AddCandidateForm = () => {
  const [name, setName] = useState("");

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/add-candidate", { name });
      alert(`Candidate added: ${response.data.name}`);
      setName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-candidate-form">
      <h2>Add Candidate</h2>
      <form onSubmit={handleAddCandidate}>
        <input
          type="text"
          placeholder="Enter Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCandidateForm;