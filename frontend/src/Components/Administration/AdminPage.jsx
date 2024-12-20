import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaUsers,
  FaPlusSquare,
  FaUserPlus,
  FaMoneyBillAlt,
  FaMinusCircle,
  FaGraduationCap,
} from "react-icons/fa";
import "./AdminPage.css";
import AddDepartment from "./DepartmentManagement/AddDepartment";
import AddEditUser from "./UserManagement/AddUser";


const AdminPage = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddDeptPopup, setShowAddDeptPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);

  const toggleAddDeptPopup = () => {
    setShowAddDeptPopup(!showAddDeptPopup);
  };

  const toggleAddUserPopup = () => {
    setShowAddUserPopup(!showAddUserPopup);
  };

  

  const addOrUpdateDepartment = (newDept) => {
    const updatedDepartments = [...departments, newDept];
    setDepartments(updatedDepartments);
  };

  const handleSaveUser = (user) => {
    const updatedUser = [...users, user];
    setUsers(updatedUser);
  };

  return (
    <div className="admin-page">
      <div className="dashboard-header">
        <h1 className="Admin-heading">Admin Dashboard</h1>
        <p className="admin-description">Manage all aspects of payroll from a single place</p>
      </div>
      <div className="dashboard-grid">
        {/* Existing links */}
        <Link to="/departments" className="dashboard-card">
          <div className="card-icon">
            <FaBuilding />
          </div>
          <h3>Manage Departments</h3>
          <p>View & manage department</p>
        </Link>
        <Link to="/users" className="dashboard-card">
          <div className="card-icon">
            <FaUsers />
          </div>
          <h3>Manage Users</h3>
          <p>View and manage users</p>
        </Link>
        <Link className="dashboard-card" onClick={toggleAddDeptPopup}>
          <div className="card-icon">
            <FaPlusSquare />
          </div>
          <h3>Add Department</h3>
          <p>Create a new department</p>
        </Link>
        <Link className="dashboard-card" onClick={toggleAddUserPopup}>
          <div className="card-icon">
            <FaUserPlus />
          </div>
          <h3>Add User</h3>
          <p>Add a new user</p>
        </Link>
        <Link to="/allowances" className="dashboard-card">
          <div className="card-icon">
            <FaMoneyBillAlt />
          </div>
          <h3>Manage Allowances</h3>
          <p>View and manage allowances</p>
        </Link>
        <Link to="/deductions" className="dashboard-card deduct">
          <div className="card-icon">
            <FaMinusCircle />
          </div>
          <h3>Manage Deductions</h3>
          <p>View and manage deductions</p>
        </Link>

        {/* Link to Grade Management page */}
        <Link to="/grade-management" className="dashboard-card deduct ">
          <div className="card-icon">
            <FaGraduationCap />
          </div>
          <h3>Grade Management</h3>
          <p>View and manage grades</p>
        </Link>

        {/* Popup components */}
        {showAddDeptPopup && (
              <AddDepartment
                closePopup={toggleAddDeptPopup}
                addOrUpdateDepartment={addOrUpdateDepartment}
              />
            
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