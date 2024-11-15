import React from 'react';
import './report.css';

const ReportComponent = ({ payrollData, monthNames, handleDelete }) => {
  if (!payrollData) {
    return <p>No report data available. Please select a month and year to generate the report.</p>;
  }

  const monthName = monthNames[payrollData.month - 1];

  const handleDeleteClick = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee\'s report?')) {
      handleDelete(employeeId);
    }
  };

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
              <th>Actions</th> {/* Add Actions column */}
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
                <td>
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteClick(employee._id)} 
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportComponent;
