import React, { useState, useEffect } from 'react';
import './ShadowContainer.css';

const ShadowContainer = ({ employee, onSubmit }) => {
  // Initialize form data with employee prop or empty object
  const [formData, setFormData] = useState(employee || {});

  // Update formData when employee prop changes
  useEffect(() => {
    setFormData(employee || {}); // Ensure formData is always an object
  }, [employee]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to the parent component
  };

  return (
    <div className="shadow-form-container">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ''} // Ensure value is a string
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={formData.departmentName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfJoining">Date of Joining</label>
            <input
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              value={formData.dateOfJoining || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">City</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ShadowContainer;
