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
import AddGrade from "./GradeManagement/AddGrade"; // Assuming this is your Add Grade component

const AdminPage = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddDeptPopup, setShowAddDeptPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showAddGradePopup, setShowAddGradePopup] = useState(false); // New state for Add Grade popup

  const toggleAddDeptPopup = () => {
    setShowAddDeptPopup(!showAddDeptPopup);
  };

  const toggleAddUserPopup = () => {
    setShowAddUserPopup(!showAddUserPopup);
  };

  const toggleAddGradePopup = () => {
    setShowAddGradePopup(!showAddGradePopup); // Toggle for Add Grade popup
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
        <h1>Admin Dashboard</h1>
        <p>Manage all aspects of your application from a single place</p>
      </div>
      <div className="dashboard-grid">
        {/* Existing links */}
        <Link to="/departments" className="dashboard-card">
          <div className="card-icon">
            <FaBuilding />
          </div>
          <h3>Manage Departments</h3>
          <p>View and edit department details</p>
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

        {/* New Add Grade card */}
        <Link className="dashboard-card" onClick={toggleAddGradePopup}>
          <div className="card-icon">
            <FaGraduationCap />
          </div>
          <h3>Add Grade</h3>
          <p>Add a new grade</p>
        </Link>

        {/* Popup components */}
        {showAddDeptPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-popup" onClick={toggleAddDeptPopup}>
                X
              </button>
              <AddDepartment
                closePopup={toggleAddDeptPopup}
                addOrUpdateDepartment={addOrUpdateDepartment}
              />
            </div>
          </div>
        )}
        {showAddUserPopup && (
          <AddEditUser
            onSave={handleSaveUser}
            closePopup={toggleAddUserPopup}
          />
        )}
        {showAddGradePopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-popup" onClick={toggleAddGradePopup}>
                X
              </button>
              <AddGrade closePopup={toggleAddGradePopup} />{" "}
              {/* Add Grade component */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
