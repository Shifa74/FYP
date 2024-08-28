import React from 'react';
import './AttendanceList.css';

const AttendanceList = ({ attendanceData }) => {
  const present = attendanceData.filter((data) => data.status === 'Present');
  const absent = attendanceData.filter((data) => data.status === 'Absent');
  const onLeave = attendanceData.filter((data) => data.status === 'Leave');

  return (
    <div className="attendance-list">
      <h2 className="title">Attendance List</h2>
      <div className="category present">
        <h3 className="category-title">Present</h3>
        <ul className="category-list">
          {present.map((data) => (
            <li key={data.employeeId} className="list-item">
              <span className="list-item-id">ID: {data.employeeId}</span>
              <span className="list-item-overtime">Overtime: {data.overtime} hours</span>
              <span className="list-item-date">Date: {data.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="category absent">
        <h3 className="category-title">Absent</h3>
        <ul className="category-list">
          {absent.map((data) => (
            <li key={data.employeeId} className="list-item">
              <span className="list-item-id">ID: {data.employeeId}</span>
              <span className="list-item-date">Date: {data.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="category on-leave">
        <h3 className="category-title">On Leave</h3>
        <ul className="category-list">
          {onLeave.map((data) => (
            <li key={data.employeeId} className="list-item">
              <span className="list-item-id">ID: {data.employeeId}</span>
              <span className="list-item-date">Date: {data.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceList;
