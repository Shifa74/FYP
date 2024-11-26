import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li title="Dashboard">
          <NavLink to="/dashboard" activeClassName="active">
            <i className="fas fa-tachometer-alt icon"></i>
            <span className="text">Dashboard</span>
          </NavLink>
        </li>
        <li title="Employees">
          <NavLink to="/Employee" activeClassName="active">
            <i className="fas fa-users icon"></i>
            <span className="text">Employees</span>
          </NavLink>
        </li>
        <li title="Payroll">
          <NavLink to="/payroll" activeClassName="active">
            <i className="fas fa-money-bill-wave icon"></i>
            <span className="text">Payroll</span>
          </NavLink>
        </li>
        <li title="Administration">
          <NavLink to="/administration" activeClassName="active">
            <i className="fas fa-cog icon"></i>
            <span className="text">Administration</span>
          </NavLink>
        </li>
        <li title="Report">
          <NavLink to="/report" activeClassName="active">
            <i className="fas fa-file-alt icon"></i>
            <span className="text">Report</span>
          </NavLink>
        </li>
        <li title="Attendance">
          <NavLink to="/attendance" activeClassName="active">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="text">Attendance</span>
          </NavLink>
        </li>
        <li title="Salary">
          <NavLink to="/Salary-List" activeClassName="active">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="text">SalaryList</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
