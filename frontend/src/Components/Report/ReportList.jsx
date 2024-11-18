import React from "react";
import "./report.css";
import { FaTrashAlt } from "react-icons/fa";


const ReportList = ({ reports, onReportClick, monthNames, handleDelete }) => {
  const handleDeleteClick =async (employeeId) => {
    if (
      window.confirm("Are you sure you want to delete this employee's report?")
    ) {
      handleDelete(employeeId);
    }
  };
  return (
    <div className="report-list">
      <h3>Previous Reports</h3>
      {reports.length === 0 ? (
        <p>No previous reports available.</p>
      ) : (
        <>
          <ul>
            {reports.map((report) => {
              const monthName = monthNames[report.month - 1];
              return (
                <li
                  key={report._id}
                  onClick={() => onReportClick(report.month, report.year)}
                >
                  {monthName} {report.year} - {report.reportData.length}{" "}
                  Employees
                  <FaTrashAlt
                    className="icon"
                    onClick={() => handleDeleteClick(report._id)}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default ReportList;
