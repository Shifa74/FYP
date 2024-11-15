import React, { useState, useEffect } from "react";
import "./Employees.css";
import AllowancesAndDeduction from "./AllowancesAndDeduction";
import EmployeeGrades from "./EmployeeGrades";
import GradeWiseSalary from "./GradeWiseSalary";
import axios from "axios";

const StatsDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [salaryPerMonth, setSalaryPerMonth] = useState(0);
  const [salaryPaid, setSalaryPaid] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [res, res1, res2] = await Promise.all([
          axios.get("/dashboard/total-employees"),
          axios.get("/dashboard/salary/per-month"),
          axios.get("/dashboard/paid-salary"),
        ]);
        setTotalEmployees(res.data);
        setSalaryPerMonth(res1.data);
        setSalaryPaid(res2.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } 
    }
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
        <p className="stat-count">${Math.round(salaryPerMonth).toLocaleString()}</p>
        {/* <p className="sign">Dollars</p> */}
      </div>

      {/* Paid Salary Card */}
      <div className="stat-box">
        <h2>Paid Salary</h2>
        <p className="stat-description">Total salary paid this month</p>
        <p className="stat-count paid_salary">${Math.round(salaryPaid).toLocaleString()}</p>
        {/* <p className="sign">Dollars</p> */}
      </div>

      <div className="components-container">
        <AllowancesAndDeduction />
        <GradeWiseSalary />
        <EmployeeGrades />
      </div>
    </div>
  );
};

export default StatsDashboard;
