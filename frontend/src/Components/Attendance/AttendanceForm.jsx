import React, { useState, useEffect } from 'react';
import './AttendanceForm.css'; // Ensure you have styles for the form

const AttendanceForm = ({ onAddAttendance, initialData }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [daysPresent, setDaysPresent] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  // Populate the form fields when editing
  useEffect(() => {
    if (initialData) {
      setEmployeeId(initialData.employeeId || '');
      setDaysPresent(initialData.daysPresent || '');
      setYear(initialData.year || '');
      setMonth(initialData.month || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeId || !daysPresent || !year || !month) {
      alert('Please fill in all required fields.');
      return;
    }

    const attendanceData = {
      _id: initialData ? initialData._id : new Date().toISOString(), // Generate new ID if adding
      employeeId,
      daysPresent: Number(daysPresent),
      year,
      month,
    };

    onAddAttendance(attendanceData);
    setEmployeeId('');
    setDaysPresent('');
    setYear('');
    setMonth('');
  };

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          placeholder="Enter Employee ID"
          className="attendance-text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="daysPresent">No. of Days Present:</label>
        <input
          type="number"
          id="daysPresent"
          value={daysPresent}
          onChange={(e) => setDaysPresent(e.target.value)}
          required
          placeholder="Enter Days Present"
          className="attendance-number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="attendance-select"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 2035 - 2023 + 1 }, (_, i) => 2023 + i).map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        {initialData ? 'Update Attendance' : 'Add Attendance'}
      </button>
    </form>
  );
};

export default AttendanceForm;
