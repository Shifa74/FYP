// SalaryList.js
import React, { useEffect, useState } from "react";
import "./SalaryList.css";
import SalaryDetails from "./SalaryDetails";
import axios from "axios";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    try {
      const fetchSalaries = async () => {
        const res = await axios.get("/salary/get");
        setSalaries(res.data);
      };
      fetchSalaries();
    } catch (error) {
      console.error("Error fetching salaries", error.message);
    }
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
          {salaries.map((salary) => (
            <tr key={salary._id}>
              <td>{salary.employeeID.employeeId}</td>
              <td>{salary.employeeID.firstName}</td>
              <td>${salary.netSalary ? salary.netSalary.toFixed(2) : "N/A"}</td>
              <td>
                <button onClick={() => handleViewDetails(salary._id)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render SalaryDetails as a popup if an employee ID is selected */}
      {selectedEmployeeId && (
        <SalaryDetails
          employeeId={selectedEmployeeId}
          salaries={salaries}
          onClose={closePopup}
        />
      )}
    </div>
    </div>
  );
};

export default SalaryList;
