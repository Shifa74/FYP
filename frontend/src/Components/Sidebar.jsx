import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/">
            <i className="fas fa-tachometer-alt icon"></i>
            <span className="text">Dashboard</span>
          </a>
          <span className="tooltip">Go to Dashboard</span>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-users icon"></i>
            <span className="text">Employees</span>
          </a>
          <span className="tooltip">View Employees</span>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-money-bill-wave icon"></i>
            <span className="text">Payroll</span>
          </a>
          <span className="tooltip">Manage Salary & Allowances</span>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-cog icon"></i>
            <span className="text">Administration</span>
          </a>
          <span className="tooltip">Admin Settings</span>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-file-alt icon"></i>
            <span className="text">Report</span>
          </a>
          <span className="tooltip">View Reports</span>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-clipboard-list icon"></i> {/* Updated icon for attendance */}
            <span className="text">Attendance</span>
          </a>
          <span className="tooltip">View Attendance</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
