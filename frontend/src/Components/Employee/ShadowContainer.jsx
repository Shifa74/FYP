import React from 'react';
import './ShadowContainer.css';

const ShadowContainer = () => {
  return (
    <div className="shadow-form-container">
      <h2>Employee Form</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idNumber">ID Number</label>
            <input type="text" id="idNumber" name="idNumber" />
          </div>
          <div className="form-group">
            <label htmlFor="departmentName">Department Name</label>
            <input type="text" id="departmentName" name="departmentName" />
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <input type="text" id="grade" name="grade" />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfJoining">Date of Joining</label>
            <input type="date" id="dateOfJoining" name="dateOfJoining" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" />
          </div>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ShadowContainer;
