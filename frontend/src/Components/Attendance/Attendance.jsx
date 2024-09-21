import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';
import './Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // State for month and year
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleAddAttendance = (attendanceData) => {
    if (editingAttendance) {
      setAttendanceRecords(
        attendanceRecords.map((record) =>
          record._id === attendanceData._id ? attendanceData : record
        )
      );
    } else {
      setAttendanceRecords([...attendanceRecords, attendanceData]);
    }
    setShowForm(false);
    setEditingAttendance(null);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingAttendance(null);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleApplyFilter = () => {
    setCurrentPage(1); // Reset to the first page on applying filter
  };

  const handleClearFilter = () => {
    setSelectedMonth('');
    setSelectedYear('');
  };

  const handleEditAttendance = (record) => {
    setEditingAttendance(record);
    setShowForm(true);
  };

  // Filter attendance by selected month and year
  const filteredRecords = attendanceRecords.filter(
    (record) => 
      (selectedMonth === '' || record.month === selectedMonth) && 
      (selectedYear === '' || record.year === selectedYear)
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Generate month options
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  
  const yearOptions = Array.from({ length: 12 }, (_, i) => 2024 + i);


  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h1 className="attendance-header">Employee Attendance</h1>
        <div className="attendance-filters">
          <select className="month-select" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {monthOptions.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select className="year-select" value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button className="apply-btn" onClick={handleApplyFilter}>Apply</button>
          <button className="clear-btn" onClick={handleClearFilter}>Clear</button>
        </div>
        <div className="attendance-buttons">
          <button className="aadd-attendance-btn" onClick={toggleForm}>
            {editingAttendance ? 'Cancel Edit' : 'Add Attendance'}
          </button>
        </div>
      </div>

      {showForm && (
        <>
          <div className="attendance-backdrop" onClick={toggleForm}></div>
          <div className="popup-form-container">
            <AttendanceForm
              onAddAttendance={handleAddAttendance}
              initialData={editingAttendance}
            />
          </div>
        </>
      )}

      <AttendanceList
        attendanceRecords={currentRecords}
        setAttendanceRecords={setAttendanceRecords}
        setEditingAttendance={handleEditAttendance}
      />
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Attendance;
