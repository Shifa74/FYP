import React, { useState } from "react";
import "./AddDepartment.css";
import axios from "axios";

const AddDepartment = ({ closePopup, addDepartment }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Department name is required");
      return;
    }

    const newDepartment = { name };
    try {
       await axios.post("/dept/add", newDepartment);
      addDepartment(newDepartment);
      closePopup();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }

  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              className="usersinputs"
              type="text"
              id="departmentName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(""); // Clear error when user types
              }}
              placeholder="Enter department name"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Add Department
          </button>
          <button type="button" className="cancel-button" onClick={closePopup}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
