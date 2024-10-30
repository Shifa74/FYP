import React, { useState, useEffect } from 'react';
import './DepartmentList.css';
// import { Link } from 'react-router-dom';
import AddDepartment from './AddDepartment';

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
                    {departments.map(department => (
                        <tr key={department.id}>
                            <td>{department.name}</td>
                            <td>{department.employees || 0}</td>
                            <td className="department-actions">
                                <button onClick={() => openEditPopup(department)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(department.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-department-button" onClick={openAddPopup}>Add Department</button>

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
