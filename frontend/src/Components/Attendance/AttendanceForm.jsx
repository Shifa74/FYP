// AttendanceForm.js
import React, { useState, useEffect } from "react";
import "./AttendanceForm.css"; // Ensure you have styles for the form
import axios from "axios";

const monthMap = [
  { number: 1, name: "January" },
  { number: 2, name: "February" },
  { number: 3, name: "March" },
  { number: 4, name: "April" },
  { number: 5, name: "May" },
  { number: 6, name: "June" },
  { number: 7, name: "July" },
  { number: 8, name: "August" },
  { number: 9, name: "September" },
  { number: 10, name: "October" },
  { number: 11, name: "November" },
  { number: 12, name: "December" },
];

const AttendanceForm = ({ onAddAttendance, initialData }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [presentDays, setPresentDays] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEmployeeId(initialData.employeeId.employeeId || "");
      setPresentDays(initialData.presentDays || "");
      setYear(initialData.year || "");
      const monthName =
        monthMap.find((m) => m.number === initialData.month)?.name || "";
      setMonth(monthName);
    }
  }, [initialData]);

  const fetchWorkingDays = async (month, year) => {
    const monthNumber = monthMap.find((m) => m.name === month)?.number;
    try {
      const response = await axios.get(
        `/attendance/getWorkingDays?month=${monthNumber}&year=${year}`
      );
      setTotalWorkingDays(response.data.workingDays);
      console.log(
        `Total working days for ${month} ${year}: ${response.data.workingDays}`
      );
    } catch (error) {
      console.error("Error fetching working days:", error);
      setTotalWorkingDays(0);
    }
  };

  // Trigger fetchWorkingDays when month or year changes
  useEffect(() => {
    if (month && year) {
      fetchWorkingDays(month, year);
    }
  }, [month, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!employeeId || !presentDays || !year || !month) {
      alert("Please fill in all required fields.");
      return;
    }
    // await fetchWorkingDays(month, year);

    if (Number(presentDays) > totalWorkingDays) {
      setError(
        `Present days cannot exceed total working days (${totalWorkingDays}).`
      );
      return;
    }

    const monthNumber = monthMap.find((m) => m.name === month)?.number;
    console.log(monthNumber);
    const attendanceData = {
      // _id: initialData ? initialData._id : new Date().toISOString(),  // Generate new ID if adding
      employeeId,
      presentDays: Number(presentDays),
      year,
      month: monthNumber,
    };

    try {
      if (initialData) {
        await axios.put(`/attendance/edit/${initialData._id}`, attendanceData);
      } else {
        await axios.post("/attendance/add", attendanceData);
      }
      onAddAttendance(attendanceData);
      setError("");
      setIsSubmitted(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (isSubmitted) {
      setError(""); // Clear error when user starts typing again
    }
  };

  const isPresentDaysError =
    isSubmitted && Number(presentDays) > totalWorkingDays;

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <div className="form-group">
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={handleInputChange(setEmployeeId)}
          required
          placeholder="Enter Employee ID"
          className="attendnace-text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="daysPresent">No. of Days Present:</label>
        <input
          type="number"
          id="daysPresent"
          value={presentDays}
          onChange={handleInputChange(setPresentDays)}
          required
          placeholder="Enter Days Present"
          className={`attendance-number ${
            isPresentDaysError ? "error-input" : ""
          }`}
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={year}
          onChange={handleInputChange(setYear)}
          required
          className="attendance-select"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 2035 - 2023 + 1 }, (_, i) => 2023 + i).map(
            (yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            )
          )}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={month}
          onChange={handleInputChange(setMonth)}
          required
        >
          <option value="">Select Month</option>
          {monthMap.map((m) => (
            <option key={m.number} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        {initialData ? "Update Attendance" : "Add Attendance"}
      </button>
    </form>
  );
};

export default AttendanceForm;
