import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar';

const Layout = ({ children, handleLogout }) => {
  return (
    <>
      <Navbar title="PAYROLL" handleLogout={handleLogout} />
      <Sidebar />
      <div className="app">
        {children}
      </div>
    </>
  );
};

export default Layout;
