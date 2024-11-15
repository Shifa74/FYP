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

  const handleDelete = async (employeeId) => {
    try {
      // Call the API to delete the salary entry
      await axios.delete(`/salary/delete/${employeeId}`);
      
      // Remove the deleted salary from the state
      setSalaries(salaries.filter(salary => salary._id !== employeeId));
      
      // Optionally, display a success message or notification
      alert("Salary record deleted successfully!");
    } catch (error) {
      console.error("Error deleting salary", error.message);
      alert("Failed to delete salary record.");
    }
  };

  return (
    <div className="salary-list-container">
      <div class="salary-table-wrapper">
        <h2 className="salary-table-heading">Salary List</h2>

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
                <button onClick={() => handleDelete(salary._id)} style={{ marginLeft: "10px" }}>
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
