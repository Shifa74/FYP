import React, { useState, useEffect } from 'react';
import './DepartmentList.css';
import { Link } from 'react-router-dom';
import AddDepartment from './AddDepartment'; // Import the AddDepartment component

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

    useEffect(() => {
        // Fetch departments from localStorage when the component mounts
        const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        setDepartments(storedDepartments);
    }, []);

    const handleDelete = (id) => {
        const updatedDepartments = departments.filter(dept => dept.id !== id);
        setDepartments(updatedDepartments); // Update the state
        localStorage.setItem('departments', JSON.stringify(updatedDepartments)); // Update localStorage
    };

    // Function to add a new department to the list and localStorage
    const addDepartment = (newDepartment) => {
        const updatedDepartments = [...departments, newDepartment];
        setDepartments(updatedDepartments); // Update the state
        localStorage.setItem('departments', JSON.stringify(updatedDepartments)); // Update localStorage
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
                            <td>{department.employees}</td>
                            <td className="department-actions">
                                <Link to={`/departments/edit/${department.id}`} className="edit-button">Edit</Link>
                                <button className="delete-button" onClick={() => handleDelete(department.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-department-button" onClick={() => setIsPopupOpen(true)}>Add Department</button>

            {/* Popup for Add Department */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <AddDepartment closePopup={() => setIsPopupOpen(false)} addDepartment={addDepartment} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentList;
