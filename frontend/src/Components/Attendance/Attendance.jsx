
import React, { useState } from 'react';
import './Attendance.css'; // Import custom styles

const AttendancePage = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState('Present');
  const [overtime, setOvertime] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = { employeeId, status, overtime };
    setAttendanceList([...attendanceList, newAttendance]);
    setEmployeeId('');
    setStatus('Present');
    setOvertime(0);
  };

  return (
    <div className="attendance-page">
      <div className="attendance-form-container">
        <h2 className="title">Add Employee Attendance</h2>
        <form onSubmit={handleSubmit} className="attendance-form">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />

          <label htmlFor="status">Attendance Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="On Leave">On Leave</option>
          </select>

          <label htmlFor="overtime">Overtime Hours</label>
          <input
            type="number"
            id="overtime"
            value={overtime}
            onChange={(e) => setOvertime(e.target.value)}
            min="0"
          />

          <button type="submit" className="submit-btn">Submit Attendance</button>
        </form>
      </div>

      <div className="attendance-list-container">
        <h2 className="title">Attendance Records</h2>
        <div className="attendance-list">
          {attendanceList.length === 0 ? (
            <p>No attendance records yet.</p>
          ) : (
            attendanceList.map((entry, index) => (
              <div key={index} className={`list-item ${entry.status.toLowerCase().replace(' ', '-')}`}>
                <div className="list-item-info">
                  <span className="list-item-id">ID: {entry.employeeId}</span>
                  <span className={`status-badge ${entry.status.toLowerCase()}`}>
                    {entry.status}
                  </span>
                </div>
                <span className="list-item-overtime">Overtime: {entry.overtime} hrs</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
