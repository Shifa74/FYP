import React, { useState, useEffect } from "react";
import ReportFilter from "./ReportFilter";
import ReportComponent from "./ReportComponent";
import ReportList from "./ReportList";
import "./report.css";
import axios from "axios";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ReportPage = () => {
  const [payrollData, setPayrollData] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/report/get");
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports", error.message);
      }
    };
    fetchReports();
  }, []);

  const fetchReportDetails = async (monthNumber, year) => {
    try {
      const res = await axios.get("/report/get/details", {
        params: { month: monthNumber, year },
      });
      setPayrollData(res.data);
    } catch (error) {
      if (error.response.data.message) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleGenerateReport = async ({ monthNumber, year }) => {
    fetchReportDetails(monthNumber, year);
  };

  const handleReportClick = (month, year) => {
    fetchReportDetails(month, year);
  };
  
  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`/report/delete/${employeeId}`);
      setReports(reports.filter((employee) => employee._id !== employeeId));
      alert("Employee report deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee report:", error.message);
      alert("Failed to delete the report.");
    }
  };

  return (
    <div className="report-page">
      <header className="report-header">
        <h1>Payroll Report</h1>
        <div className="filter-container">
          <ReportFilter
            onGenerateReport={handleGenerateReport}
            monthNames={monthNames}
          />
        </div>
      </header>

      <div className="report-content">
        <ReportComponent payrollData={payrollData} monthNames={monthNames} />
        <ReportList
          reports={reports}
          onReportClick={handleReportClick}
          monthNames={monthNames}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ReportPage;
