import React, { useState } from 'react';
import ReportFilter from './ReportFilter';
import ReportComponent from './ReportComponent';
import ReportList from './ReportList';
import './report.css';

const ReportPage = () => {
  const [payrollData, setPayrollData] = useState(null);

  // Static data for the previous 3 months
  const [reports] = useState([
    { month: 'August', year: '2024', employeeCount: 10 },
    { month: 'July', year: '2024', employeeCount: 8 },
    { month: 'June', year: '2024', employeeCount: 12 },
  ]);

  // Mock data to simulate report generation
  const mockPayrollData = {
    month: 'August',
    year: '2024',
    employees: [
      { id: 1, name: 'John Doe', grossSalary: 5000, bonuses: 300, deductions: 200, netSalary: 5100 },
      { id: 2, name: 'Jane Smith', grossSalary: 4800, bonuses: 200, deductions: 100, netSalary: 4900 },
      { id: 1, name: 'John Doe', grossSalary: 5000, bonuses: 300, deductions: 200, netSalary: 5100 },
      { id: 2, name: 'Jane Smith', grossSalary: 4800, bonuses: 200, deductions: 100, netSalary: 4900 },
      { id: 1, name: 'John Doe', grossSalary: 5000, bonuses: 300, deductions: 200, netSalary: 5100 },
      { id: 2, name: 'Jane Smith', grossSalary: 4800, bonuses: 200, deductions: 100, netSalary: 4900 },
      
      // More employee data...
    ],
  };

  const handleGenerateReport = ({ month, year }) => {
    setPayrollData({ ...mockPayrollData, month, year });
  };

  const handleReportClick = (month, year) => {
    setPayrollData({
      ...mockPayrollData,
      month,
      year,
    });
  };

  return (
    <div className="report-page">
      <header className="report-header">
        <h1>Payroll Report</h1>
        <div className="filter-container">
          <ReportFilter onGenerateReport={handleGenerateReport} />
        </div>
      </header>
      
      <div className="report-content">
        <ReportComponent payrollData={payrollData} />
        <ReportList reports={reports} onReportClick={handleReportClick} />
      </div>
    </div>
  );
};

export default ReportPage;
