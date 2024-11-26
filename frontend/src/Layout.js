// Components/Layout.js
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar';

const Layout = ({ children, setIsAuthenticated }) => {
  return (
    <>
      <Navbar title='PAYROLL' />
      <Sidebar />
      <div className="app">
        {children}
      </div>
    </>
  );
}

export default Layout;
