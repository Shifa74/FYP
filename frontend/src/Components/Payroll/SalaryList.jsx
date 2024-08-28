import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SalaryList.css';

const SalaryList = () => {
  const navigate = useNavigate();

  const salaryData = JSON.parse(localStorage.getItem('salaryData')) || [
    { id: 1, employeeName: 'SHAHRIYAR', date: 'January 2024', amount: 3500 },
    { id: 2, employeeName: 'ALI', date: 'January 2024', amount: 4200 },
    { id: 3, employeeName: 'NJAM', date: 'January 2024', amount: 3000 },
    { id: 4, employeeName: 'FATIMA', date: 'January 2024', amount: 4500 },
    { id: 5, employeeName: 'EMAN', date: 'January 2024', amount: 3700 },
    { id: 6, employeeName: 'HASAN', date: 'January 2024', amount: 4100 },
  ];

  const handleClick = (id) => {
    navigate(`/salary-details/${id}`);
  };

  return (
    <div className="salary-list-container">
      <h2 className="heading">Salary List</h2>
      <div className="salary-grid">
        {salaryData.map((salary) => (
          <div key={salary.id} className="salary-card" onClick={() => handleClick(salary.id)}>
            <h3>{salary.employeeName}</h3>
            <p>{salary.date}</p>
            <p>${salary.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryList;
