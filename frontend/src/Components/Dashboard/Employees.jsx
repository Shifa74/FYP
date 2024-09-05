import React, { useState, useEffect } from 'react';
import './Employees.css';
// import GradeWiseSalary from './GradeWiseSalary';
// import NotificationsAndAlerts from './NotificationsAndAlerts';
import EmployeeGrades from './EmployeeGrades';
import GradeWiseSalary from './GradeWiseSalary';

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
  const gradesData = [
    { numberOfEmployees: 10 },
    { numberOfEmployees: 15 },
    { numberOfEmployees: 20 },
    { numberOfEmployees: 25 },
    { numberOfEmployees: 30 },
    { numberOfEmployees: 35 },
    { numberOfEmployees: 40 },
    { numberOfEmployees: 45 },
    { numberOfEmployees: 50 }
];

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


      <div>
        <EmployeeGrades gradesData={gradesData}/>
      </div>

      <div>
        <GradeWiseSalary/>
      </div>

    </div>
  );
};

export default StatsDashboard;
