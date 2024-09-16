import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';
import './Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [editingAttendance, setEditingAttendance] = useState(null);

  const handleAddAttendance = (attendanceData) => {
    if (editingAttendance) {
      // Update existing record
      setAttendanceRecords(
        attendanceRecords.map((record) =>
          record._id === attendanceData._id ? attendanceData : record
        )
      );
    } else {
      // Add new record
      setAttendanceRecords([...attendanceRecords, attendanceData]);
    }
    setShowForm(false); // Close form after submission
    setEditingAttendance(null); // Reset editing state
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingAttendance(null); // Reset editing state when toggling form
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleEditAttendance = (record) => {
    setEditingAttendance(record);
    setShowForm(true); // Open form when editing
  };

  // Filter attendance by selected month
  const filteredRecords = attendanceRecords.filter(
    (record) => selectedMonth === '' || record.month === selectedMonth
  );

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h1 className="attendance-header">Employee Attendance</h1>
        <div className="aattendance-buttons">
          <button className="aadd-attendance-btn" onClick={toggleForm}>
            {editingAttendance ? 'Cancel Edit' : 'Add Attendance'}
          </button>
          <select className="month-select" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">All Months</option>
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
      </div>

      {showForm && (
        <>
          <div className="attendance-backdrop" onClick={toggleForm}></div>
          <div className="popup-form-container">
            <AttendanceForm
              onAddAttendance={handleAddAttendance}
              initialData={editingAttendance} // Pass editing data to the form
            />
          </div>
        </>
      )}

      <AttendanceList
        attendanceRecords={filteredRecords}
        setAttendanceRecords={setAttendanceRecords}
        setEditingAttendance={handleEditAttendance} // Pass handleEdit function
      />
    </div>
  );
};

export default Attendance;
