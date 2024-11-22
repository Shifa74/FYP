import React, { useState, useEffect } from "react";
import "./DepartmentList.css";
import AddDepartment from "./AddDepartment";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState(null); // Track department being edited
  const [refresh, setRefresh] = useState(false); 
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("/dept/employeeCountByDept");
        console.log(res.data);
        setDepartments(res.data);
      } catch (error) {
        console.log("Error fetching departments", error.message);
      }
    };
    fetchDepartments();
  }, [refresh]);

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

  const addOrUpdateDepartment = async (newDepartment) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
    setIsPopupOpen(false);
    setRefresh((prev) => !prev);
  };

  const openAddPopup = () => {
    setDepartmentToEdit(null);
    setIsPopupOpen(true);
  };

  const openEditPopup = (department) => {
    setDepartmentToEdit(department);
    setIsPopupOpen(true);
  };

  return (
    <div className="department-list-container">
    <div className="department-heading">
        <h2 className="department-page-title">Manage Departments</h2>
        <button className="add-department-button" onClick={openAddPopup}>
          Add Department
        </button>
      </div>
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
                <button
                  onClick={() => openEditPopup(department)}
                  className="dept-list-edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(department._id)}
                  className="dept-list-delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     

      {/* Popup for Add or Edit Department */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <AddDepartment
            closePopup={() => setIsPopupOpen(false)}
            addOrUpdateDepartment={addOrUpdateDepartment}
            departmentToEdit={departmentToEdit}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
