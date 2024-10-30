import React, { useState, useEffect } from 'react';
import './DepartmentList.css';
// import { Link } from 'react-router-dom';
import AddDepartment from './AddDepartment';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [departmentToEdit, setDepartmentToEdit] = useState(null); // Track department being edited

    useEffect(() => {
        const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        setDepartments(storedDepartments);
    }, []);

    const handleDelete = (id) => {
        const updatedDepartments = departments.filter(dept => dept.id !== id);
        setDepartments(updatedDepartments);
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    };

    const addOrUpdateDepartment = (newDepartment) => {
        let updatedDepartments;
        if (departmentToEdit) {
            // Update the existing department
            updatedDepartments = departments.map(dept =>
                dept.id === departmentToEdit.id ? { ...dept, ...newDepartment } : dept
            );
        } else {
            // Add new department
            newDepartment.id = new Date().getTime().toString(); // Generate unique ID
            updatedDepartments = [...departments, newDepartment];
        }
        setDepartments(updatedDepartments);
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));
        setIsPopupOpen(false); // Close the popup after submission
        setDepartmentToEdit(null); // Reset edit state
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
