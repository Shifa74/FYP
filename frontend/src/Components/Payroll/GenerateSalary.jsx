import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GenerateSalary.css';

const GenerateSalary = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate = useNavigate();

  const handleGenerateSalary = () => {
    if (!selectedMonth || !selectedYear) {
      alert('Please select both month and year.');
      return;
    }

    // Generate random data
    const randomData = [
      { id: 1, employeeName: 'SHAHRIYAR', date: 'January 2024', amount: 3500 },
      { id: 2, employeeName: 'ALI', date: 'January 2024', amount: 4200 },
      { id: 3, employeeName: 'FATIMA', date: 'January 2024', amount: 3000 },
      { id: 4, employeeName: 'EMAN', date: 'January 2024', amount: 4500 },
      { id: 5, employeeName: 'HASAN', date: 'January 2024', amount: 3700 },
    ];

    // Save data to localStorage
    localStorage.setItem('salaryData', JSON.stringify(randomData));

    // Alert user about successful data generation
    alert('Salary data generated successfully!');

    // Navigate to salary list
    navigate('/salary-list');
  };

  return (
    <div className="generate-salary-container">
      <h2 className="heading">Generate Salary</h2>
      <p className="subtitle">Generate salary by selecting month and year</p>
      <div className="dropdown-container">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>Select Month</option>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>Select Year</option>
          {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerateSalary} className="generate-button">Generate Salary</button>
    </div>
  );
};

export default GenerateSalary;
