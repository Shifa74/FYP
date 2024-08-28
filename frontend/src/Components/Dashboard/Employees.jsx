import React, { useState, useEffect } from 'react';
import './Employees.css';
// import GradeWiseSalary from './GradeWiseSalary';
import NotificationsAndAlerts from './NotificationsAndAlerts';

const StatsDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [salaryPerMonth, setSalaryPerMonth] = useState(0);
  const [salaryPaid, setSalaryPaid] = useState(0);

  useEffect(() => {
    const fetchStats = () => {
      setTimeout(() => {
        setTotalEmployees(150);
        setSalaryPerMonth(50000);
        setSalaryPaid(30000);
      }, 1000);
    };

    fetchStats();
  }, []);

  return (
    <div className="stats-dashboard">
      {/* Total Employees Card */}
      <div className="stat-box">
        <h2>Total Employees</h2>
        <p className="stat-description">Total number of employees</p>
        <p className="stat-count">{totalEmployees}</p>
        {/* <p className="sub">Employees</p> */}
      </div>

      {/* Salary per Month Card */}
      <div className="stat-box">
        <h2>Salary per Month</h2>
        <p className="stat-description">Total salary allocated per month</p>
        <p className="stat-count">${salaryPerMonth}</p>
        {/* <p className="sign">Dollars</p> */}
      </div>

      {/* Paid Salary Card */}
      <div className="stat-box">
        <h2>Paid Salary</h2>
        <p className="stat-description">Total salary paid this month</p>
        <p className="stat-count">${salaryPaid}</p>
        {/* <p className="sign">Dollars</p> */}
      </div>

      <div className="dashboard-container">
      <NotificationsAndAlerts />
    </div>
  

    </div>
  );
};

export default StatsDashboard;
