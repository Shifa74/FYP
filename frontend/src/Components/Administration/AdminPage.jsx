import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage all aspects of your application from a single place</p>
            </div>
            <div className="dashboard-grid">
                <Link to="/departments" className="dashboard-card">
                    <div className="card-icon">🏢</div>
                    <h3>Manage Departments</h3>
                    <p>View and edit department details</p>
                </Link>
                <Link to="/departments/add" className="dashboard-card">
                    <div className="card-icon">➕</div>
                    <h3>Add Department</h3>
                    <p>Create a new department</p>
                </Link>
                <Link to="/users" className="dashboard-card">
                    <div className="card-icon">👥</div>
                    <h3>Manage Users</h3>
                    <p>View and manage users</p>
                </Link>
                <Link to="/users/add" className="dashboard-card">
                    <div className="card-icon">➕</div>
                    <h3>Add User</h3>
                    <p>Add a new user</p>
                </Link>
                <Link to="/roles" className="dashboard-card">
                    <div className="card-icon">🛠️</div>
                    <h3>Manage Roles</h3>
                    <p>Assign and manage user roles</p>
                </Link>
                <Link to="/settings" className="dashboard-card">
                    <div className="card-icon">⚙️</div>
                    <h3>Settings</h3>
                    <p>Configure application settings</p>
                </Link>
                <Link to="/allowances" className="dashboard-card">
                    <div className="card-icon">💰</div>
                    <h3>Manage Allowances</h3>
                    <p>View and manage allowances</p>
                </Link>
                <Link to="/deductions" className="dashboard-card">
                    <div className="card-icon">💸</div>
                    <h3>Manage Deductions</h3>
                    <p>View and manage deductions</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
