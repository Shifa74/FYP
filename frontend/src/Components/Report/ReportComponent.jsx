// src/components/ReportComponent.jsx
import React from 'react';
import './report.css';

const ReportComponent = ({ payrollData }) => {
  if (!payrollData) {
    return <p>No payroll data available. Please generate a report.</p>;
  }

  return (
    <div className="report-container">
      <h2>Payroll Report - {payrollData.month} {payrollData.year}</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Gross Salary</th>
            <th>Bonuses</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.grossSalary}</td>
              <td>{employee.bonuses}</td>
              <td>{employee.deductions}</td>
              <td>{employee.netSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportComponent;
