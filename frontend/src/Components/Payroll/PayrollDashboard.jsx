import React from 'react';
import './PayrollDashboard.css';
import GenerateSalary from './GenerateSalary';
import PayrollList from './PayrollList';
import IncentivesAndBonuses from './IncentivesAndBonuses';
// import Deduction from './Deduction';

const PayrollDashboard = () => {
  return (
    <div className="payroll-dashboard-container">
      <div className="payroll-dashboard">
        <div className="dashboard-card">
          <h3>Payroll Costs</h3>
          <p>$10,000</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Payments</h3>
          <p>$1,200</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Expenses</h3>
          <p>$8,500</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Payrolls</h3>
          <p>15</p>
        </div>
      </div>
      <GenerateSalary />
      <PayrollList/>
      <IncentivesAndBonuses/>
      {/* <Deduction/> */}
    </div>
  );
};

export default PayrollDashboard;
