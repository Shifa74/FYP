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
          path="/Attendance" 
          element={<Layout><Attendance /></Layout>}
         /> 
      </Routes>
    </Router>
  );
}

export default App;
