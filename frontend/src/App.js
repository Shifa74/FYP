import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Register from './Components/LoginForm/Register';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import LoginForm from './Components/LoginForm/LoginForm';
import Employee from './Components/Dashboard/Employees';

import EmployeeDetails from './Components/Employee/EmployeeDetails';

// Define grades data


// Dashboard Component
function Dashboard() {
  return (
    <>
      <Navbar title='PAYROLL' />
      <Sidebar />
      <div className="app">
        <Employee />
      </div>
    </>
  );
}

// App Component with Routes
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
          element= {<Dashboard />} 
        />
        <Route 
          path="/employee" 
          element={<EmployeeDetails/>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
