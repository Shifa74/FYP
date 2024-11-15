import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';
 // Import FaMoneyCheckAlt icon

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        
       
        <li title=" Dashboard">
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt icon"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li title="Employees">
          <Link to="/Employee">
            <i className="fas fa-users icon"></i>
            <span className="text">Employees</span>
          </Link>
        </li>
        <li title="Payroll">
          <Link to="/payroll">
            <i className="fas fa-money-bill-wave icon"></i>
            <span className="text">Payroll</span>
          </Link>
        </li>
        <li title="Administration">
          <Link to="/administration">
            <i className="fas fa-cog icon"></i>
            <span className="text">Administration</span>
          </Link>
        </li>
        <li title=" Report">
          <Link to="/report">
            <i className="fas fa-file-alt icon"></i>
            <span className="text">Report</span>
          </Link>
        </li>
        <li title=" Attendance">
          <Link to="/attendance">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="text">Attendance</span>
          </Link>
        </li>
        <li title="Salary">
          <Link to="/Salary-List">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="text">SalaryList</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
