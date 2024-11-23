import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";




const AddEditUser = ({ onSave, initialData, closePopup }) => {
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [email, setEmail] = useState(initialData ? initialData.email : "");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (isSubmitted) {
      setError(""); // Clear error when user starts typing again
    }
  };

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    try {
      if (initialData && initialData._id) {
        const res = await axios.put(`/users/edit/${initialData._id}`, {
          name,
          email,
        });
        onSave(res.data);
      } else {
        const res = await axios.post("/users/add", { name, email });
        onSave(res.data);
      }
      setIsSubmitted(false);
      closePopup(); // Ensure closePopup is triggered here
      navigate("/users");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
    
  };

  const handleClose = () => {
    closePopup(); // Correct closePopup function
   
  };

  return (
    <div className="userpopup-overlay">
      <div className="userpopup">
        <h2 className="user_heading">
          {initialData ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} noValidate className="add-edit-user-form">

          <div className="user-form-group">
            {error && <p className="user-error-message">{error}</p>}
            <label className="user-label" htmlFor="userName">
              User Name:
            </label>
            <input
              className="add-user-input"
              type="text"
              id="userName"
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="Enter user name"
              required
            />
          </div>
          <div className="user-form-group">
            <label className="user-label" htmlFor="userEmail">
              Email:
            </label>
            <input
              className={`add-user-input ${error ? "user-error-input" : ""}`}
              type="email"
              id="userEmail"
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="Enter user email"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="user-submit-button">
              Save
            </button>
            <button
              type="button"
              className="user-cancel-button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUser;
