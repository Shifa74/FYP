import React, { useState, useEffect } from "react";
import "./ShadowContainer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShadowContainer = ({
  employee,
  onSubmit,
  departments,
  grades,
  loading,
}) => {
  // Initialize form data with employee prop or empty object
  const [formData, setFormData] = useState(employee || {});
  const [errors, setErrors] = useState({});
  const [selectedDept, setSelectedDept] = useState(
    employee?.deptName?._id || ""
  );
  const [selectedGrade, setSelectedGrade] = useState(
    employee?.gradeNo?._id || ""
  );

  const naviagte = useNavigate()

  // Update formData when employee prop changes
  useEffect(() => {
    setFormData(employee || {});
    setSelectedDept(employee?.deptName?._id || "");
    setSelectedGrade(employee?.gradeNo?._id || "");
  }, [employee]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    setErrors({ ...errors, [name]: "" });
  };

  // Handle department and grade changes
  const handleDeptChange = (e) => {
    const selectedDeptId = e.target.value;
    setSelectedDept(selectedDeptId);
    setFormData((prevState) => ({
      ...prevState,
      deptName: selectedDeptId,
    }));
  };

  const handleGradeChange = (e) => {
    const selectedGradeId = e.target.value;
    setSelectedGrade(selectedGradeId);
    setFormData((prevState) => ({
      ...prevState,
      gradeNo: selectedGradeId,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e, path) => {
    e.preventDefault();
    try {
      console.log("Submitting data: ", formData);
      if (employee) {
        // If editing an existing employee
        const response = await axios.put(
          `/employee/edit/${employee._id}`,
          formData
        );
        console.log("Edit response:", response.data);
      } else {
        // If adding a new employee
        const response = await axios.post("/employee/add", formData);
        console.log("Add response:", response.data);
      }
      onSubmit(formData);
      naviagte(path);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="shadow-form-container">
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="number"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId || ""}
              onChange={handleInputChange}
              className={errors.employeeId ? "error-input" : ""}
            />
            {errors.employeeId && (
              <p className="error-message">{errors.employeeId}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dob"
              value={
                formData.dob
                  ? new Date(formData.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departmentName">Department</label>
            <select
              id="departmentName"
              name="deptName"
              value={selectedDept}
              onChange={handleDeptChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <select
              id="grade"
              name="gradeNo"
              value={selectedGrade}
              onChange={handleGradeChange}
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade._id} value={grade._id}>
                  {grade.gradeNo}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNo"
              value={formData.phoneNo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="dateOfJoining">Date of Joining</label>
            <input
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              value={
                formData.dateOfJoining
                  ? new Date(formData.dateOfJoining).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={(e) => handleInputChange(e, "/employee")}
            />
          </div>
        </div>
        
        <div>
          <button className="submit-button" type="submit">
            {employee ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShadowContainer;
