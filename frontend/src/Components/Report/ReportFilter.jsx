import React, { useState } from "react";
import "./report.css";
import axios from "axios";

const ReportFilter = ({ onGenerateReport, monthNames }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const monthNumber = monthNames.indexOf(month) + 1;

  const handleGenerate = async () => {
    if (monthNumber && year) {
      try {
        await axios.post("/report/add", {
          month: monthNumber,
          year,
        });
        onGenerateReport({ monthNumber, year });
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        }
      }
    } else {
      alert("Please select both month and year!");
    }
  };

  return (
    <div className="filter-container">
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option>Select Month</option>
        {monthNames.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      <button onClick={handleGenerate} className="generatereport">Generate Report</button>
    </div>
  );
};

export default ReportFilter;
