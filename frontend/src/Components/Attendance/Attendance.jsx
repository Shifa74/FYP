import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';
import './Attendance.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const handleAddAttendance = (data) => {
    setAttendanceData([...attendanceData, data]);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-form-container">
        <AttendanceForm onAddAttendance={handleAddAttendance} />
      </div>
      <div className="attendance-list-container">
        <AttendanceList attendanceData={attendanceData} />
      </div>
    </div>
  );
};

export default Attendance;
