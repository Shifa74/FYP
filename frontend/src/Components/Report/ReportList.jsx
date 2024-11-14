import React from "react";
import "./report.css";

const ReportList = ({ reports, onReportClick, monthNames}) => {
  return (
    <div className="report-list">
      <h3>Previous Reports</h3>
      {reports.length === 0 ? (
        <p>No previous reports available.</p>
      ) : (
        <ul>
          {reports.map((report) => {
             const monthName = monthNames[report.month - 1];
            return (
              <li
                key={report._id}
                onClick={() => onReportClick(report.month, report.year)}
              >
                {monthName} {report.year} - {report.reportData.length} Employees
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
