import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GenerateSalary.css";
import axios from "axios";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const GenerateSalary = ({ onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [deductions, setDeductions] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [selectedAllow, setSelectedAllow] = useState("");
  const [selectedDeduct, setSelectedDeduct] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const monthNumber = monthNames.indexOf(selectedMonth) + 1;

  useEffect(() => {
    const fetchAllowandDeduct = async () => {
      try {
        const [allowRes, deductRes] = await Promise.all([
          axios.get("/allowance/get"),
          axios.get("/deduction/get"),
        ]);
        setAllowances(allowRes.data);
        setDeductions(deductRes.data);
      } catch (error) {
        console.error(
          "Error fetching allowances and deductions",
          error.message
        );
      }
    };
    fetchAllowandDeduct();
  }, []);

  const handleGenerateSalary = async () => {
    if (!selectedMonth || !selectedYear || !employeeId) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("/salary/add", {
        employeeId,
        month: monthNumber,
        year: selectedYear,
        allowance: selectedAllow,
        deduction: selectedDeduct,
        overtimeHours,
      });
      alert("Salary data generated successfully!");
      onClose();
      navigate("/Salary-List");
      resetForm();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("salary-modal-overlay")) {
      onClose();
    }
  };

  const resetForm = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setEmployeeId("");
    setDeductions("");
    setAllowances("");
    setOvertimeHours("");
  };

  return (
    <div className="salary-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="generate-salary-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="salary-popup-header">
          <h2 className="salary-heading">Generate Salary</h2>
          <button onClick={onClose} className="popup-close-btn">
            ✖
          </button>
        </div>
        <p className="salary-subtitle">
          Select month, year, and enter employee details
        </p>
        {error && <p className="salary-err-mess">{error}</p>}
        <div className="salary-input-group">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => {
              setEmployeeId(e.target.value);
              setError("");
            }}
            className={`salary-input-field ${error ? "salary-err-input" : ""}`}
          />
        </div>
        <div className="salary-dropdown-container">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setError(error);
            }}
            className={`salary-dropdown ${error ? "salary-err-input" : ""}`}
          >
            <option value="" disabled>
              Select Month
            </option>
            {monthNames.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setError("");
            }}
            className={`salary-dropdown ${error ? "salary-err-input" : ""}`}
          >
            <option value="" disabled>
              Select Year
            </option>
            {Array.from(
              { length: 10 },
              (_, index) => new Date().getFullYear() - index
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="salary-input-group">
          <select
            id="allowance"
            name="allowances"
            value={selectedAllow}
            onChange={(e) => {
              setSelectedAllow(e.target.value);
              setError("");
            }}
            className="salary-input-field"
          >
            <option value="">Select Allowance</option>
            {allowances.map((allowance) => (
              <option key={allowance._id} value={allowance._id}>
                {allowance.allowanceType} - ${allowance.amount}
              </option>
            ))}
          </select>
          <select
            id="deduction"
            name="deductions"
            value={selectedDeduct}
            onChange={(e) => {
              setSelectedDeduct(e.target.value);
              setError("");
            }}
            className="salary-input-field"
          >
            <option value="">Select Deduction</option>
            {deductions.map((deduction) => (
              <option key={deduction._id} value={deduction._id}>
                {deduction.deductionType} - ${deduction.amount}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Overtime Hours"
            value={overtimeHours}
            onChange={(e) => {
              setOvertimeHours(e.target.value);
              setError("");
            }}
            className="salary-input-field"
          />
        </div>
        <button
          onClick={handleGenerateSalary}
          className="salary-generate-button"
        >
          Generate Salary
        </button>
      </div>
    </div>
  );
};

export default GenerateSalary;
