import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Register from './Components/LoginForm/Register';
import LoginForm from './Components/LoginForm/LoginForm';
import Dashboard from './Components/Dashboard/Employees';
import EmployeeDetails from './Components/Employee/EmployeeDetails';
import PayrollDashboard from './Components/Payroll/PayrollDashboard';
import Administration from './Components/Administration/AdminPage';
import Attendance from './Components/Attendance/Attendance';
import Layout from './Layout'; // Import the Layout component
import SalaryList from "./Components/Payroll/SalaryList";
import AllowancesAndDeductionDetails from './Components/Dashboard/AllowancesAndDeductionDetails';
// Import Admin page components
import ManageDepartments from './Components/Administration/DepartmentManagement/DepartmentList';
import ManageUsers from './Components/Administration/UserManagement/UserManagement';
import AddDepartment from './Components/Administration/DepartmentManagement/AddDepartment';
import AddUser from './Components/Administration/UserManagement/AddUser';
import ManageAllowances from './Components/Administration/Allowances/AllowanceList';
import ManageDeductions from './Components/Administration/Deduction/DeductionPage';
import GradeList from './Components/Administration/GradeManagement/GradeList';
import ReportPage from './Components/Report/ReportPage';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Get the initial state from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Update localStorage whenever `isAuthenticated` changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm onLogin={() => setIsAuthenticated(true)} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/login" 
          element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } 
        />
      
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><EmployeeDetails /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payroll" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><PayrollDashboard /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Administration" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Administration /></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/report" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><ReportPage /></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/Attendance" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Attendance /></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/Salary-List" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><SalaryList/></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/allowances-deduction-details" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><AllowancesAndDeductionDetails/></Layout>
            </ProtectedRoute>
          }
        /> 
 
        {/* Admin Page Routes */}
        <Route 
          path="/departments" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><ManageDepartments /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><ManageUsers /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/departments/add" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><AddDepartment /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/users/add" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><AddUser /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/allowances" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><ManageAllowances /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/deductions" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><ManageDeductions /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/grade-management" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><GradeList /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
