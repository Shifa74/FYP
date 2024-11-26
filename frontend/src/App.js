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
import ManageAllowances from './Components/Administration/Allowances/AllowanceList';
import ManageDeductions from './Components/Administration/Deduction/DeductionPage';
import GradeList from './Components/Administration/GradeManagement/GradeList';
import ReportPage from './Components/Report/ReportPage';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import axios from 'axios';


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Get the initial state from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // Update localStorage whenever `isAuthenticated` changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);




  const handleLogout = async () => {
    try {
      const response = await axios.get("/auth/logout");
      console.log(response.data.message);
      if (response.status === 200) {
          // setIsAuthenticated(false);
          localStorage.setItem('isAuthenticated', 'false')
        }
    } catch (error) {
      console.error("Error Message:", error.message);
    }
  };


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
          element={<Register onSignup={() => setIsAuthenticated(true)} />} 
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
              <Layout handleLogout={handleLogout}><Dashboard /></Layout>
            </ProtectedRoute>
          } 
        />
      
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><EmployeeDetails /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payroll" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><PayrollDashboard /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Administration" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><Administration /></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/report" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><ReportPage /></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/Attendance" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><Attendance /></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/Salary-List" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><SalaryList/></Layout>
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/allowances-deduction-details" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><AllowancesAndDeductionDetails/></Layout>
            </ProtectedRoute>
          }
        /> 
 
        {/* Admin Page Routes */}
        <Route 
          path="/departments" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><ManageDepartments /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><ManageUsers /></Layout>
            </ProtectedRoute>
          }
        />
      
        <Route 
          path="/allowances" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><ManageAllowances /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/deductions" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><ManageDeductions /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/grade-management" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}><GradeList /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
