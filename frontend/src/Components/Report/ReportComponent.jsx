import React from 'react';
import './report.css';

const ReportComponent = ({ payrollData, monthNames, }) => {
  if (!payrollData) {
    return <p>No report data available. Please select a month and year to generate the report.</p>;
  }

  const monthName = monthNames[payrollData.month - 1];

  return (
    <div className="report-container">
      <h2>{monthName} {payrollData.year} Payroll Report</h2>
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
            {payrollData.reportData.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.employeeDetails.employeeId}</td>
                <td>{employee.employeeDetails.firstName}</td>
                <td>{employee.baseSalary}</td>
                <td>{employee.allowanceDetails.amount}</td>
                <td>{Math.round(employee.totalDeductions)}</td>
                <td>{Math.round(employee.netSalary)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportComponent;
