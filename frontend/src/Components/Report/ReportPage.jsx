// src/pages/ReportPage.jsx
import React, { useState } from 'react';
import ReportFilter from './ReportFilter';
import ReportComponent from './ReportComponent';
import ReportList from './ReportList';
import './report.css';

const ReportPage = () => {
  const [payrollData, setPayrollData] = useState(null);

  // Static report data for report list
  const [reports] = useState([
    { month: 'January', year: '2024', employeeCount: 10 },
    { month: 'February', year: '2024', employeeCount: 8 },
    { month: 'March', year: '2024', employeeCount: 12 },
  ]);

  // Mock data for generating reports
  const mockPayrollData = {
    month: 'January',
    year: '2024',
    employees: [
      { id: 1, name: 'John Doe', grossSalary: 5000, bonuses: 300, deductions: 200, netSalary: 5100 },
      { id: 2, name: 'Jane Smith', grossSalary: 4800, bonuses: 200, deductions: 100, netSalary: 4900 },
      // Add more employees here
    ],
  };

  const handleGenerateReport = ({ month, year }) => {
    // Here you'd normally fetch data from an API, but we're using static data
    setPayrollData({ ...mockPayrollData, month, year });
  };

  return (
    <div className="report-page">
      <h1>Payroll Report</h1>
      <ReportFilter onGenerateReport={handleGenerateReport} />
      <ReportComponent payrollData={payrollData} />
      <ReportList reports={reports} />
    </div>
  );
};

export default ReportPage;
