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
            <p>
              <strong>Employee Name:</strong>{" "}
              {salaryDetails.employeeID.firstName}
            </p>
            <p>
              <strong>Base Salary:</strong> ${(salaryDetails.baseSalary).toLocaleString()}
            </p>
            <p>
              <strong>Allowances:</strong> $
              {(salaryDetails.allowances.amount).toLocaleString()}
            </p>
            <p>
              <strong>Deductions:</strong> ${Math.round(salaryDetails.totalDeductions).toLocaleString()}
            </p>
            <p>
              <strong>Overtime Hours:</strong> {salaryDetails.overtimeHours}
            </p>
            <p>
              <strong>Overtime Pay:</strong> ${Math.round(salaryDetails.overtimePay).toLocaleString()}
            </p>
            <p>
              <strong>Total Salary:</strong> ${Math.round(salaryDetails.netSalary).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading salary details...</p>
        )}
      </div>
    </div>
  );
};

export default SalaryDetails;
