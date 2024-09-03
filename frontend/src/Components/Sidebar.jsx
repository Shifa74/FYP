import React from 'react';
import './Sidebar.css';
import { FaMoneyCheckAlt } from 'react-icons/fa'; // Import FaMoneyCheckAlt icon

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li style={{marginBottom:'30px'}}>
          <a href="/">
            <FaMoneyCheckAlt className="icon" style={{ marginRight: '0.5rem' }} /> {/* Payroll icon */}
            <span className="text">Payroll</span>         
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-tachometer-alt icon"></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-users icon"></i>
            <span className="text">Employees</span>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-money-bill-wave icon"></i>
            <span className="text">Payroll</span>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-cog icon"></i>
            <span className="text">Administration</span>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-file-alt icon"></i>
            <span className="text">Report</span>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="text">Attendance</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
