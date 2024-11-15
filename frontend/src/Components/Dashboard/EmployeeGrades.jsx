import React, { useEffect, useState } from "react";
import "./EmployeeGrades.css";
import axios from "axios";

const EmployeeGrades = () => {
    const [employeeGrades, setEmployeeGrades] = useState([]);
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get("/dashboard/grade-wise/employees");
        setEmployeeGrades(res.data);
      } catch (error) {
        console.error("Error fetching grades", error.message);
      }
    };
    fetchGrades();
  }, []);
  return (
    <div className="employee-grades-container">
      <div className="header">
        <div className="title-section">
          <h4 className="heading">Number of Employees</h4>
          <p className="subtitle">Department or Grade wise</p>
        </div>
      </div>
      <div className="employee-grades">
        {employeeGrades.map((grade) => (
          <div key={grade._id} className="grade-item">
            <div className="grade-box">
              <h3>Grade{grade.gradeNo}</h3>
            </div>
            <p className="employee-count">{grade.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeGrades;
