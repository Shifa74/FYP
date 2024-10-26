// src/components/ReportFilter.jsx
import React, { useState } from 'react';
import './report.css';

const ReportFilter = ({ onGenerateReport }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleGenerate = () => {
    if (month && year) {
      onGenerateReport({ month, year });
    } else {
      alert('Please select both month and year!');
    }
  };

  return (
    <div className="filter-container">
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Select Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      <button onClick={handleGenerate}>Generate Report</button>
    </div>
  );
};

export default ReportFilter;
