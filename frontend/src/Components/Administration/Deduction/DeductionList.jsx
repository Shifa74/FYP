import React from 'react';
import './DeductionList.css';

const DeductionList = ({ deductions }) => {
  return (
    <div className="deduction-list-container">
      <h2 className="deduction-list-title">Employee Deductions</h2>
      <table className="deduction-list-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Deduction Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {deductions.map((deduction, index) => (
            <tr key={index}>
              <td>{deduction.employeeId}</td>
              <td>{deduction.deductionType}</td>
              <td>${deduction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeductionList;
