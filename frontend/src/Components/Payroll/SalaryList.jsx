// SalaryList.js
import React, { useEffect, useState } from "react";
import "./SalaryList.css";
import SalaryDetails from "./SalaryDetails";
import axios from "axios";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const defaultMonth = monthNames[new Date().getMonth()]; // Get the current month name
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth); // Month state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const selectedMonthNumber = monthNames.indexOf(selectedMonth) + 1;

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await axios.get("/salary/get");
        setSalaries(res.data);
      } catch (error) {
        console.error("Error fetching salaries", error.message);
      }
    };
    
    fetchSalaries();
  }, [selectedMonth, selectedYear]); // Refetch data when month or year changes
  

  const handleViewDetails = (employeeId) => {
    setSelectedEmployeeId(employeeId); // Set selected employee ID to open the modal
  };

  const closePopup = () => {
    setSelectedEmployeeId(null); // Reset the selected employee ID to close the modal
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`/salary/delete/${employeeId}`);
      setSalaries(salaries.filter((salary) => salary._id !== employeeId));
      alert("Salary record deleted successfully!");
    } catch (error) {
      console.error("Error deleting salary", error.message);
      alert("Failed to delete salary record.");
    }
  };

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const yearOptions = [];
  for (let i = 2020; i <= new Date().getFullYear() + 3; i++) {
    yearOptions.push(i);
  }

  const filteredData = salaries.filter((item) => {
    return item.month === selectedMonthNumber && item.year === selectedYear;
  });

  return (
    <div className="salary-list-container">
      <div className="salary-table-wrapper">
        <div className="filter-wrapper">
          <h2 className="salary-table-heading">Salary List</h2>
          <div className="salary-header-filters">
            <label>
              Month:
              <select value={selectedMonth} onChange={handleMonthChange}>
                {monthNames.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Year:
              <select value={selectedYear} onChange={handleYearChange}>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <table className="salary-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Total Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((salary) => (
              <tr key={salary._id}>
                <td>{salary.employeeID.employeeId}</td>
                <td>{salary.employeeID.firstName}</td>
                <td>
                  $
                  {salary.netSalary
                    ? Math.round(salary.netSalary).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  <button onClick={() => handleViewDetails(salary._id)}>
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(salary._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
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
