import React from 'react';
import './report.css';

const ReportComponent = ({ payrollData }) => {
  if (!payrollData) {
    return <p>No report data available. Please select a month and year to generate the report.</p>;
  }

  return (
    <div className="report-container">
      <h2>{payrollData.month} {payrollData.year} Payroll Report</h2>
      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gross Salary</th>
              <th>Bonuses</th>
              <th>Deductions</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
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
    </div>
  );
};

export default ReportComponent;
