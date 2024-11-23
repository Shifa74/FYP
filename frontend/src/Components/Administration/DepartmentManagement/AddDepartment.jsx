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
      setName(departmentToEdit.departmentName);
    } else {
      setName("");
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
        console.log("Received addOrUpdateDepartment:", addOrUpdateDepartment);

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
    <div className="deptpopup-overlay">
      <div className="deptpopup">
        <h2>{departmentToEdit ? "Edit Department" : "Add Department"}</h2>
        <form onSubmit={handleSubmit} noValidate>
            {error && <p className="depterror-message">{error}</p>}
          <div className="deptform-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              className="deptusersinputs"
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

          <div className="dept-buttons">

          <button type="submit" className="dept-submit-button">
            {departmentToEdit ? "Update Department" : "Add Department"}
          </button>
          <button type="button" className="dept-cancel-button" onClick={closePopup}>
            Cancel
          </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
