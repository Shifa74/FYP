// SalaryDetails.js
import React, { useEffect, useState } from "react";
import "./SalaryDetails.css";

const SalaryDetails = ({ employeeId, salaries, onClose }) => {
  const [salaryDetails, setSalaryDetails] = useState(null);

  useEffect(() => {
    const salary = salaries.find((s) => s._id === employeeId);
    setSalaryDetails(salary);
  }, [employeeId, salaries]);

  return (
    <div className="salary-modal-overlay" onClick={onClose}>
      <div
        className="salary-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            Salary Details for Employee ID:{" "}
            {salaryDetails ? salaryDetails.employeeID.employeeId : "N/A"}
          </h2>
          <button onClick={onClose} className="close-btn">
            ✖
          </button>
        </div>
        {salaryDetails ? (
          <div className="salary-breakdown">
          <div className="salary-item">
            <span className="salary-label">Employee Name:</span>
            <span className="salary-value">{salaryDetails.employeeID.firstName}</span>
          </div>
          <div className="salary-item">
            <span className="salary-label">Base Salary:</span>
            <span className="salary-value">${salaryDetails.baseSalary.toLocaleString()}</span>
          </div>
          <div className="salary-item">
            <span className="salary-label">Allowances:</span>
            <span className="salary-value">
              ${salaryDetails.allowances.amount.toLocaleString()}
            </span>
          </div>
          <div className="salary-item">
            <span className="salary-label">Deductions:</span>
            <span className="salary-value">
              ${Math.round(salaryDetails.totalDeductions).toLocaleString()}
            </span>
          </div>
          <div className="salary-item">
            <span className="salary-label">Overtime Hours:</span>
            <span className="salary-value">{salaryDetails.overtimeHours}</span>
          </div>
          <div className="salary-item">
            <span className="salary-label">Overtime Pay:</span>
            <span className="salary-value">
              ${Math.round(salaryDetails.overtimePay).toLocaleString()}
            </span>
          </div>
          <div className="salary-item">
            <span className="salary-label">Total Salary:</span>
            <span className="salary-value">
              ${Math.round(salaryDetails.netSalary).toLocaleString()}
            </span>
          </div>
        </div>
        
        ) : (
          <p>Loading salary details...</p>
        )}
      </div>
    </div>
  );
};

export default SalaryDetails;
