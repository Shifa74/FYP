import React, { useState } from 'react';
import './AttendanceForm.css';

const AttendanceForm = ({ onAddAttendance }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState('');
  const [overtime, setOvertime] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeId || !status || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const attendanceData = {
      employeeId,
      status,
      overtime: overtime || 0,
      date,
    };

    onAddAttendance(attendanceData);
    setEmployeeId('');
    setStatus('');
    setOvertime('');
    setDate('');
  };

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="" disabled>Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
      </div>
      <div>
        <label>Overtime Hours:</label>
        <input
          type="number"
          value={overtime}
          onChange={(e) => setOvertime(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Attendance</button>
    </form>
  );
};

export default AttendanceForm;
