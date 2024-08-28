import React, { useState, useEffect } from 'react';
import './DepartmentList.css';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        setDepartments(storedDepartments);
    }, []);

    const handleDelete = (id) => {
        const updatedDepartments = departments.filter(dept => dept.id !== id);
        setDepartments(updatedDepartments);
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));
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
            <Link to="/departments/add" className="add-department-button">Add Department</Link>
        </div>
    );
};

export default DepartmentList;
