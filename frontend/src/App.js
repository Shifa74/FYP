import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Register from './Components/LoginForm/Register';
import LoginForm from './Components/LoginForm/LoginForm';
import Dashboard from './Components/Dashboard/Employees';
import EmployeeDetails from './Components/Employee/EmployeeDetails';
import  PayrollDashboard from './Components/Payroll/PayrollDashboard'
import Administration from './Components/Administration/AdminPage'
import Attendance from './Components/Attendance/Attendance'
import Layout from './Layout'; // Import the Layout component


// Import Admin page components
import ManageDepartments from './Components/Administration/DepartmentManagement/DepartmentList';
import ManageUsers from './Components/Administration/UserManagement/UserManagement';
import AddDepartment from './Components/Administration//DepartmentManagement/AddDepartment';
import AddUser from './Components/Administration/UserManagement/AddUser';
import ManageAllowances from './Components/Administration/Allowances/AllowanceList';
import ManageDeductions from './Components/Administration/Deduction/DeductionPage';
import GradeList from './Components/Administration/GradeManagement/GradeList'


import ReportPage from './Components/Report/ReportPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          element={<Layout><Dashboard /></Layout>} 
        />
        <Route 
          path="/employee" 
          element={<Layout><EmployeeDetails /></Layout>} 
        />
        <Route 
          path="/payroll" 
          element={<Layout><PayrollDashboard/></Layout>} 
        />
        <Route 
          path="/Administration" 
          element={<Layout><Administration /></Layout>}
         /> 
         <Route 
          path="/report" 
          element={<Layout><ReportPage /></Layout>}
         /> 
          <Route 
          path="/Attendance" 
          element={<Layout><Attendance /></Layout>}
         /> 




         
          {/* Admin Page Routes */}
        <Route 
          path="/departments" 
          element={<Layout><ManageDepartments /></Layout>} 
        />
        <Route 
          path="/users" 
          element={<Layout><ManageUsers /></Layout>} 
        />
        <Route 
          path="/departments/add" 
          element={<Layout><AddDepartment /></Layout>} 
        />
        <Route 
          path="/users/add" 
          element={<Layout><AddUser /></Layout>} 
        />
        <Route 
          path="/allowances" 
          element={<Layout><ManageAllowances /></Layout>} 
        />
        <Route 
          path="/deductions" 
          element={<Layout><ManageDeductions /></Layout>} 
        />
          <Route 
          path="/grade-management" 
          element={<Layout><GradeList /></Layout>}
         />
      
      
      </Routes>
    </Router>
  );
}

export default App;
