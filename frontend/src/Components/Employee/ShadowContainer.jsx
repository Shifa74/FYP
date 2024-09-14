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
  onClose,
}) => {
  const [formData, setFormData] = useState(employee || {});
  const [errors, setErrors] = useState({});
  const [selectedDept, setSelectedDept] = useState(
    employee?.deptName?._id || ""
  );
  const [selectedGrade, setSelectedGrade] = useState(
    employee?.gradeNo?._id || ""
  );

  // Update formData when employee prop changes
  useEffect(() => {
    setFormData(employee || {});
    setSelectedDept(employee?.deptName?._id || "");
    setSelectedGrade(employee?.gradeNo?._id || "");
  }, [employee]);
  const handleClose = () => {
    if (onClose) {
      onClose(); // Call the onClose prop when the form is closed
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required.";
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!selectedDept) newErrors.deptName = "Department is required.";
    if (!selectedGrade) newErrors.gradeNo = "Grade is required.";
    if (!formData.phoneNo) newErrors.phoneNo = "Phone Number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of Joining is required.";
    if (!formData.city) newErrors.city = "City is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleDeptChange = (e) => {
    const selectedDeptId = e.target.value;
    setSelectedDept(selectedDeptId);
    setFormData((prevState) => ({
      ...prevState,
      deptName: selectedDeptId,
    }));
    setErrors((prevState) => ({ ...prevState, deptName: "" }));
  };

  const handleGradeChange = (e) => {
    const selectedGradeId = e.target.value;
    setSelectedGrade(selectedGradeId);
    setFormData((prevState) => ({
      ...prevState,
      gradeNo: selectedGradeId,
    }));
    setErrors((prevState) => ({ ...prevState, gradeNo: "" }));
  };

  const handleSubmit = async (e, path) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (employee) {
        const response = await axios.put(
          `/employee/edit/${employee._id}`,
          formData
        );
        console.log("Edit response:", response.data);
      } else {
        const response = await axios.post("/employee/add", formData);
        console.log("Add response:", response.data);
      }
      onSubmit(formData);
      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="shadow-form-container">
      <div className="form-header">
        <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
      </div>
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
              className={errors.firstName ? "error-input" : ""}
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              className={errors.lastName ? "error-input" : ""}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
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
              className={errors.dob ? "error-input" : ""}
            />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="departmentName">Department</label>
            <select
              id="departmentName"
              name="deptName"
              value={selectedDept}
              onChange={handleDeptChange}
              className={errors.deptName ? "error-input" : ""}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.deptName && <p className="error-message">{errors.deptName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <select
              id="grade"
              name="gradeNo"
              value={selectedGrade}
              onChange={handleGradeChange}
              className={errors.gradeNo ? "error-input" : ""}
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade._id} value={grade._id}>
                  {grade.gradeNo}
                </option>
              ))}
            </select>
            {errors.gradeNo && <p className="error-message">{errors.gradeNo}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNo"
              value={formData.phoneNo || ""}
              onChange={handleInputChange}
              className={errors.phoneNo ? "error-input" : ""}
            />
            {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
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
              className={errors.dateOfJoining ? "error-input" : ""}
            />
            {errors.dateOfJoining && (
              <p className="error-message">{errors.dateOfJoining}</p>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={(e) => handleInputChange(e, "/employee")}
              className={errors.city ? "error-input" : ""}
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
        </div>

        
        <div className="form-actions">
          <button className="submit-button" type="submit">
            {employee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShadowContainer;
