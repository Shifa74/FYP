import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GenerateSalary.css';

const GenerateSalary = ({ onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [deductions, setDeductions] = useState('');
  const [allowances, setAllowances] = useState('');
  const navigate = useNavigate();

  const handleGenerateSalary = () => {
    if (!selectedMonth || !selectedYear || !employeeId) {
      alert('Please fill in all fields.');
      return;
    }

    const salaryData = [
      {
        id: employeeId,
        employeeName: 'SHAHRIYAR',
        date: `${selectedMonth} ${selectedYear}`,
        baseAmount: 3500,
        deductions: parseFloat(deductions) || 0,
        allowances: parseFloat(allowances) || 0,
        netAmount: 3500 - (parseFloat(deductions) || 0) + (parseFloat(allowances) || 0),
      },
    ];

    localStorage.setItem('salaryData', JSON.stringify(salaryData));
    alert('Salary data generated successfully!');
    onClose();
    navigate('/salary-list');
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('salary-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="salary-modal-overlay" onClick={handleOverlayClick}>
      <div className="generate-salary-popup" onClick={(e) => e.stopPropagation()}>
        <div className="salary-popup-header">
          <h2 className="salary-heading">Generate Salary</h2>
          <button onClick={onClose} className="popup-close-btn">✖</button>
        </div>
        <p className="salary-subtitle">Select month, year, and enter employee details</p>
        <div className="salary-input-group">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="salary-input-field"
          />
        </div>
        <div className="salary-dropdown-container">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="salary-dropdown"
          >
            <option value="" disabled>Select Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="salary-dropdown"
          >
            <option value="" disabled>Select Year</option>
            {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="salary-input-group">
          <input
            type="number"
            placeholder="Deductions"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="salary-input-field"
          />
          <input
            type="number"
            placeholder="Allowances"
            value={allowances}
            onChange={(e) => setAllowances(e.target.value)}
            className="salary-input-field"
          />
        </div>
        <button onClick={handleGenerateSalary} className="salary-generate-button">Generate Salary</button>
      </div>
    </div>
  );
};

export default GenerateSalary;
