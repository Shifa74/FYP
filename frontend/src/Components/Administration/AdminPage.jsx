import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUsers, FaPlusSquare, FaUserPlus, FaMoneyBillAlt, FaMinusCircle, FaGraduationCap } from 'react-icons/fa';
import './AdminPage.css';
import AddDepartment from './DepartmentManagement/AddDepartment';
import AddEditUser from './UserManagement/AddUser';

const AdminPage = () => {
    const [departments, setDepartments] = useState(() => {
        return JSON.parse(localStorage.getItem('departments')) || [];
    });
    const [showAddDeptPopup, setShowAddDeptPopup] = useState(false);
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);

    const toggleAddDeptPopup = () => {
        setShowAddDeptPopup(!showAddDeptPopup);
    };

    const toggleAddUserPopup = () => {
        setShowAddUserPopup(!showAddUserPopup);
    };

    const addDepartment = (newDept) => {
        const updatedDepartments = [...departments, newDept];
        setDepartments(updatedDepartments);
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    };

    const handleSaveUser = (user) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = [...existingUsers, { ...user, id: existingUsers.length ? existingUsers[existingUsers.length - 1].id + 1 : 1 }];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        toggleAddUserPopup();
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
                <Link className="dashboard-card" onClick={toggleAddUserPopup}>
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

                {/* Link to Grade Management page */}
                <Link to="/grade-management" className="dashboard-card">
                    <div className="card-icon"><FaGraduationCap /></div>
                    <h3>Grade Management</h3>
                    <p>View and manage grades</p>
                </Link>

                {/* Popup components */}
                {showAddDeptPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-popup" onClick={toggleAddDeptPopup}>X</button>
                            <AddDepartment closePopup={toggleAddDeptPopup} addDepartment={addDepartment} />
                        </div>
                    </div>
                )}
                {showAddUserPopup && (
                    <AddEditUser
                        onSave={handleSaveUser}
                        closePopup={toggleAddUserPopup}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
