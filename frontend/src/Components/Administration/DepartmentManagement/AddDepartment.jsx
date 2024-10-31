import React, { useState, useEffect } from "react";
import "./AddDepartment.css";
import axios from "axios";

const AddDepartment = ({
  closePopup,
  addOrUpdateDepartment,
  departmentToEdit,
}) => {
  const [name, setName] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (departmentToEdit) {
      setName(departmentToEdit.departmentName); // Set name if editing an existing department
    } else {
      setName(""); // Clear name if adding a new department
    }
    setError("");

  }, [departmentToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Department name is required");
      return;
    }
    
    try {
      let res;
      if (departmentToEdit) {
        res = await axios.put(`/dept/edit/${departmentToEdit._id}`, {name});
      } else { 
        res = await axios.post("/dept/add", {name});
      }
      addOrUpdateDepartment(res.data);
      closePopup();

    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{departmentToEdit ? "Edit Department" : "Add Department"}</h2>
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
                setError("");
              }}
              placeholder="Enter department name"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            {departmentToEdit ? "Update Department" : "Add Department"}
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
