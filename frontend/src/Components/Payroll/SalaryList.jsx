// SalaryList.js
import React, { useEffect, useState } from 'react';
import './SalaryList.css';
import SalaryDetails from './SalaryDetails';

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    const salaryData = JSON.parse(localStorage.getItem('salaryData')) || [];
    setSalaries(salaryData);
  }, []);

  const handleViewDetails = (employeeId) => {
    setSelectedEmployeeId(employeeId); // Set selected employee ID to open the modal
  };

  const closePopup = () => {
    setSelectedEmployeeId(null); // Reset the selected employee ID to close the modal
  };

  return (
    <div className="salary-list-container">
  <div class="salary-table-wrapper">
      <h2 className='salary-table-heading'>Salary List</h2>

      <table class="salary-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Total Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary, index) => (
            <tr key={index}>
              <td>{salary.id}</td>
              <td>{salary.employeeName}</td>
              <td>${salary.netAmount.toFixed(2)}</td>
              <td>
                <button onClick={() => handleViewDetails(salary.id)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render SalaryDetails as a popup if an employee ID is selected */}
      {selectedEmployeeId && (
        <SalaryDetails employeeId={selectedEmployeeId} onClose={closePopup} />
      )}
    </div>
    </div>
  );
};

export default SalaryList;
