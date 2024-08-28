import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalaryDetails.css';

const SalaryDetails = ({ employeeId }) => {
  const [salary, setSalary] = useState(null);

  useEffect(() => {
    const fetchSalary = async () => {
      const response = await axios.get(`/api/salary/${employeeId}`);
      setSalary(response.data.salary);
    };

    fetchSalary();
  }, [employeeId]);

  return (
    <div className="salary-details-container">
      <h2>Salary Details</h2>
      {salary !== null ? (
        <p>Total Salary: ${salary}</p>
      ) : (
        <p>Loading salary details...</p>
      )}
    </div>
  );
};

export default SalaryDetails;
