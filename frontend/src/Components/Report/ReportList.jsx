import React from 'react';
import './report.css';

const ReportList = ({ reports, onReportClick }) => {
  return (
    <div className="report-list">
      <h3>Previous Reports</h3>
      {reports.length === 0 ? (
        <p>No previous reports available.</p>
      ) : (
        <ul>
          {reports.map((report, index) => (
            <li key={index} onClick={() => onReportClick(report.month, report.year)}>
              {report.month} {report.year} - {report.employeeCount} Employees
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
