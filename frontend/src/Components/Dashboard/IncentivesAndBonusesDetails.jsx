import React from 'react';
import './IncentivesAndBonusesDetails.css';

const IncentivesAndBonusesDetails = () => {
  // Sample data
  const data = [
    { id: 1, employee: 'John Doe', incentive: 200, bonus: 100, date: '2024-07-01' },
    { id: 2, employee: 'Jane Smith', incentive: 150, bonus: 120, date: '2024-07-02' },
    { id: 3, employee: 'Mark Johnson', incentive: 180, bonus: 90, date: '2024-07-03' },
    { id: 4, employee: 'Emily Brown', incentive: 220, bonus: 110, date: '2024-07-04' },
    { id: 5, employee: 'Michael White', incentive: 170, bonus: 80, date: '2024-07-05' },
  ];

  return (
    <div className="incentives-bonuses-details-container">
      <h2 className="heading">Incentives and Bonuses Details</h2>
      <table className="details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Incentive</th>
            <th>Bonus</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.employee}</td>
              <td>${item.incentive}</td>
              <td>${item.bonus}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncentivesAndBonusesDetails;
