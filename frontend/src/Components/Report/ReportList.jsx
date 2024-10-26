// src/components/ReportList.jsx
import React from 'react';
import './report.css';

const ReportList = ({ reports }) => {
  return (
    <div className="report-list">
      <h3>Available Reports</h3>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>
              {report.month} {report.year} - {report.employeeCount} Employees
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
