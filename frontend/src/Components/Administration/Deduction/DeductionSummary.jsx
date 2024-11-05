import React from 'react';
import './deductionSummary.css';

const DeductionSummary = ({totalDeductions}) => {

  return (
    <div className="deduction-summary-container">
      <h3 className="deduction-summary-title">Total Deductions Summary</h3>
      <p className="deduction-summary-text">Total Deductions: ${totalDeductions}</p>
    </div>
  );
}

export default DeductionSummary;
