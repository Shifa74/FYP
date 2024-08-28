import React from 'react';
import GenerateSalary from './GenerateSalary';
import SalaryList from './SalaryList';
import './PayrollPage.css';

const PayrollPage = () => {
  return (
    <div className="payroll-page">
      <div className="sidebar">
        <h2>Payroll Management</h2>
        <ul>
          <li>Generate Salary</li>
          <li>Salary List</li>
        </ul>
      </div>
      <div className="content">
        <GenerateSalary />
        <SalaryList />
      </div>
    </div>
  );
};

export default PayrollPage;
