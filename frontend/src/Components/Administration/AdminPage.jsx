import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUsers, FaPlusSquare, FaUserPlus, FaMoneyBillAlt, FaMinusCircle, FaCog } from 'react-icons/fa'; 
import './AdminPage.css';
import AddDepartment from './DepartmentManagement/AddDepartment';
import AddEditUser from './UserManagement/AddUser'

const AdminPage = () => {
    const [departments, setDepartments] = useState(() => {
        // Retrieve departments from localStorage
        return JSON.parse(localStorage.getItem('departments')) || [];
    });
    const [showAddDeptPopup, setShowAddDeptPopup] = useState(false);

    // Function to toggle the popup
    const toggleAddDeptPopup = () => {
        setShowAddDeptPopup(!showAddDeptPopup);
    };

    // Function to add a new department
    const addDepartment = (newDept) => {
        const updatedDepartments = [...departments, newDept];
        setDepartments(updatedDepartments);
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    };
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);

    const toggleAddUserPopup = () => {
        setShowAddUserPopup(!showAddUserPopup);
    };

    const handleSaveUser = (user) => {
        console.log('Saved user:', user);
        // Handle saving user logic here
        toggleAddUserPopup(); // Close the popup after saving
    };
    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage all aspects of your application from a single place</p>
            </div>
            <div className="dashboard-grid">
                <Link to="/departments" className="dashboard-card">
                    <div className="card-icon"><FaBuilding /></div>
                    <h3>Manage Departments</h3>
                    <p>View and edit department details</p>
                </Link>
                <Link to="/users" className="dashboard-card">
                    <div className="card-icon"><FaUsers /></div>
                    <h3>Manage Users</h3>
                    <p>View and manage users</p>
                </Link>
                <Link className="dashboard-card" onClick={toggleAddDeptPopup}>
                    <div className="card-icon"><FaPlusSquare /></div>
                    <h3>Add Department</h3>
                    <p>Create a new department</p>
                </Link>
                <Link to="/users/add" className="dashboard-card">
                    <div className="card-icon"><FaUserPlus /></div>
                    <h3>Add User</h3>
                    <p>Add a new user</p>
                </Link>
                <Link to="/allowances" className="dashboard-card">
                    <div className="card-icon"><FaMoneyBillAlt /></div>
                    <h3>Manage Allowances</h3>
                    <p>View and manage allowances</p>
                </Link>
                <Link to="/deductions" className="dashboard-card deduct">
                    <div className="card-icon"><FaMinusCircle /></div>
                    <h3>Manage Deductions</h3>
                    <p>View and manage deductions</p>
                </Link>
                <Link to="/settings" className="dashboard-card">
                    <div className="card-icon"><FaCog /></div>
                    <h3>Settings</h3>
                    <p>Configure application settings</p>
                </Link>

                {/* AddDepartment Popup */}
                {showAddDeptPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-popup" onClick={toggleAddDeptPopup}>X</button>
                            {/* Pass addDepartment function as prop */}
                            <AddDepartment closePopup={toggleAddDeptPopup} addDepartment={addDepartment} />
                        </div>
                    </div>
                )}
                 {/* Render AddEditUser popup */}
            {showAddUserPopup && (
                <AddEditUser
                    onSave={handleSaveUser}
                    closePopup={toggleAddUserPopup} // Pass closePopup function
                />
            )}
            </div>
        </div>
    );
};

export default AdminPage;
