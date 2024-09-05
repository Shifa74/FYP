import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';
import { FaMoneyCheckAlt } from 'react-icons/fa'; // Import FaMoneyCheckAlt icon

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li style={{marginBottom:'30px'}}>
          <Link to="/dashboard">
            <FaMoneyCheckAlt className="icon" style={{ marginRight: '0.5rem' }} /> {/* Payroll icon */}
            <span className="text">Payroll</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt icon"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/Employee">
            <i className="fas fa-users icon"></i>
            <span className="text">Employees</span>
          </Link>
        </li>
        <li>
          <Link to="/payroll">
            <i className="fas fa-money-bill-wave icon"></i>
            <span className="text">Payroll</span>
          </Link>
        </li>
        <li>
          <Link to="/administration">
            <i className="fas fa-cog icon"></i>
            <span className="text">Administration</span>
          </Link>
        </li>
        <li>
          <Link to="/report">
            <i className="fas fa-file-alt icon"></i>
            <span className="text">Report</span>
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="text">Attendance</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
