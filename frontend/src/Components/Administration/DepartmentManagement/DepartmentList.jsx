import React, { useState, useEffect } from 'react';
import './DepartmentList.css';
import AddDepartment from './AddDepartment';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [departmentToEdit, setDepartmentToEdit] = useState(null);

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
            updatedDepartments = departments.map(dept =>
                dept.id === departmentToEdit.id ? { ...dept, ...newDepartment } : dept
            );
        } else {
            newDepartment.id = new Date().getTime().toString(); // Unique ID for new departments
            updatedDepartments = [...departments, newDepartment];
        }
        setDepartments(updatedDepartments);
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));
        setIsPopupOpen(false);
        setDepartmentToEdit(null);
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

            {isPopupOpen && (
    <div className="popup-overlay">
        <AddDepartment
            closePopup={() => setIsPopupOpen(false)}
            addOrUpdateDepartment={addOrUpdateDepartment} // Check this line
            departmentToEdit={departmentToEdit}
        />
    </div>
)}


        </div>
    );
};

export default DepartmentList;
