import React, { useState } from 'react';
import './Report.css';

const mockEmployeeData = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 60000 },
  { id: 2, name: 'Jane Smith', position: 'Project Manager', salary: 75000 },
  { id: 3, name: 'Alice Johnson', position: 'Designer', salary: 50000 },
  { id: 4, name: 'Bob Brown', position: 'QA Tester', salary: 45000 }
];

const ReportingAnalytics = () => {
  const [showReport, setShowReport] = useState(false);

  const handleButtonClick = () => {
    setShowReport(!showReport);
  };

  return (
    <div className="reporting-analytics-container">
      <button className="show-report-button" onClick={handleButtonClick}>
        {showReport ? 'Hide Payroll Report' : 'Show Payroll Report'}
      </button>
      {showReport && (
        <div className="report-content">
          <h2>Payroll Report</h2>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployeeData.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>${employee.salary.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingAnalytics;
