import React, { useState, useEffect } from "react";
import "./DepartmentList.css";
import { Link } from "react-router-dom";
import AddDepartment from "./AddDepartment";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(false); // New state for triggering refetch

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("/dept/employeeCountByDept");
        setDepartments(res.data);
      } catch (error) {
        console.log("Error fetching departments", error.message);
      }
    };
    fetchDepartments();
  }, [refresh]); // Re-run fetch when refresh changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/dept/delete/${id}`);
      setDepartments((prevDepartments) =>
        prevDepartments.filter((dept) => dept._id !== id)
      );
    } catch (error) {
      console.log("Error deleting department", error.message);
    }
  };

  const addDepartment = () => {
    setIsPopupOpen(false);
    setRefresh((prev) => !prev); // Toggle refresh to trigger useEffect
  };

  return (
    <div className="department-list-container">
      <h2>Manage Departments</h2>
      <table className="department-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Number of Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.departmentName}</td>
              <td>{department.employeeCount}</td>
              <td className="department-actions">
                <Link
                  to={`/departments/edit/${department._id}`}
                  className="edit-button"
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(department._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="add-department-button"
        onClick={() => setIsPopupOpen(true)}
      >
        Add Department
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <AddDepartment
              closePopup={() => setIsPopupOpen(false)}
              addDepartment={addDepartment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
