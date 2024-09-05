// Components/Layout.js
import React from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

const Layout = ({ children }) => {
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
