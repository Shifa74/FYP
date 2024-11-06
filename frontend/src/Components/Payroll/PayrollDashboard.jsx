import React, { useState } from 'react';
import './PayrollDashboard.css';
import GenerateSalary from './GenerateSalary';
import PayrollList from './PayrollList'
import IncentivesAndBonuses from './IncentivesAndBonuses'

const PayrollDashboard = () => { 
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div>
      {/* Header Section */}
      <div className="payroll-dashboard-header">
        <h1>Payroll Management</h1>
        
        {/* Filters Section */}
        <div className="payroll-header-filters">
          <label>
            Month:
            <select>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              {/* Add more months as needed */}
            </select>
          </label>
          <label>
            Employee:
            <select>
              <option>All Employees</option>
              <option>Employee 1</option>
              <option>Employee 2</option>
              {/* Add more employees as needed */}
            </select>
          </label>
        </div>
        
        {/* Generate Salary Button */}
        <button onClick={handleOpenPopup} className="payroll-generate-salary-button">
          Generate Salary
        </button>

        {/* Popup Overlay */}
        {isPopupOpen && (
          <div className="payroll-popup-overlay" onClick={handleClosePopup}>
            <div className="payroll-popup-content" onClick={(e) => e.stopPropagation()}>
              <GenerateSalary onClose={handleClosePopup} />
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Cards */}
      <div className="payroll-dashboard">
        <div className="payroll-dashboard-card">
          <h3>Payroll Costs</h3>
          <p>$10,000</p>
        </div>
        <div className="payroll-dashboard-card">
          <h3>Pending Payments</h3>
          <p>$1,200</p>
        </div>
        <div className="payroll-dashboard-card">
          <h3>Total Payrolls</h3>
          <p>15</p>
        </div>
      </div>
      <div>
        <h2>PayrollList Details</h2>
        <PayrollList /> {/* Render the SalaryList component */}
        {/* <h2>ALLOWANCES AND BONUSES</h2>\ */}
        <IncentivesAndBonuses/>
      </div>
    </div>
  );
};

export default PayrollDashboard;
