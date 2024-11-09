// SalaryDetails.js
import React, { useEffect, useState } from 'react';
import './SalaryDetails.css';

const SalaryDetails = ({ employeeId, onClose }) => {
  const [salaryDetails, setSalaryDetails] = useState(null);

  useEffect(() => {
    const salaries = JSON.parse(localStorage.getItem('salaryData')) || [];
    const salary = salaries.find((s) => s.id === employeeId);
    setSalaryDetails(salary);
  }, [employeeId]);

  return (
    <div className="salary-modal-overlay" onClick={onClose}>
      <div className="salary-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Salary Details for Employee ID: {employeeId}</h2>
          <button onClick={onClose} className="close-btn">✖</button>
        </div>
        {salaryDetails ? (
          <div className="salary-breakdown">
            <p><strong>Employee Name:</strong> {salaryDetails.employeeName}</p>
            <p><strong>Base Salary:</strong> ${salaryDetails.baseAmount}</p>
            <p><strong>Allowances:</strong> ${salaryDetails.allowances}</p>
            <p><strong>Deductions:</strong> ${salaryDetails.deductions}</p>
            <p><strong>Overtime Hours:</strong> {salaryDetails.overtimeHours}</p>
            <p><strong>Overtime Pay:</strong> ${salaryDetails.overtimePay}</p>
            <p><strong>Total Salary:</strong> ${salaryDetails.netAmount}</p>
          </div>
        ) : (
          <p>Loading salary details...</p>
        )}
      </div>
    </div>
  );
};

export default SalaryDetails;
