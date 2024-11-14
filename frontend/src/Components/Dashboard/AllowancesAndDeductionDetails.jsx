import React from 'react';
import './AllowancesAndDeductionDetails.css';

const AllowancesAndDeductionDetails = () => {
  // Sample data
  const data = [
    { id: 1, employee: 'John Doe', allowances: 200, deduction: 100, date: '2024-07-01' },
    { id: 2, employee: 'Jane Smith', allowances: 150, deduction: 120, date: '2024-07-02' },
    { id: 3, employee: 'Mark Johnson', allowances: 180, deduction: 90, date: '2024-07-03' },
    { id: 4, employee: 'Emily Brown', allowances: 220, deduction: 110, date: '2024-07-04' },
    { id: 5, employee: 'Michael White', allowances: 170, deduction: 80, date: '2024-07-05' },
  ];

  return (
    <div className="allowances-deduction-details-container">
      <h2 className="heading">AllowancesAndDeductionDetails</h2>
      <table className="details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Allowances</th>
            <th>Deduction</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.employee}</td>
              <td>${item.allowances}</td>
              <td>${item.deduction}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllowancesAndDeductionDetails;
