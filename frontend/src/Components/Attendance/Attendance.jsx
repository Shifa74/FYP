import React, { useEffect, useState } from "react";
import AttendanceForm from "./AttendanceForm";
import AttendanceList from "./AttendanceList";
import "./Attendance.css";
import axios from "axios";

// Generate month options
const monthOptions = [
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

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  // State for month and year
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchAttendance = async () => {
    try {
      const response = await axios.get("/attendance/get");
      setAttendanceRecords(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAttendance();
    const currentMonthNumber = new Date().getMonth() + 1;
    const currentMonthName = monthOptions.find(
      (m) => m.number === currentMonthNumber
    )?.name;

    setSelectedMonth(currentMonthName);
  }, []);

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
    fetchAttendance();
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
    setSelectedMonth("");
    setSelectedYear("");
  };

  const handleEditAttendance = (record) => {
    setEditingAttendance(record);
    setShowForm(true);
  };

  // Filter attendance by selected month and year
  const filteredRecords = attendanceRecords.filter((record) => {
    const monthNumber = monthOptions.find(
      (m) => m.name === selectedMonth
    )?.number;
    return (
      (selectedMonth === "" || record.month === monthNumber) &&
      (selectedYear === "" || record.year === Number(selectedYear))
      );
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const yearOptions = Array.from({ length: 12 }, (_, i) => 2024 + i);

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h1 className="attendance-heading">Employee Attendance</h1>
        <div className="attendance-filters">
          <select
            className="filter-month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">Select Month</option>
            {monthOptions.map((m) => (
              <option key={m.number} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
          <select
            className="year-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="button-container">
          <button className="apply-btn" onClick={handleApplyFilter}>
            Apply
          </button>
          <button className="clear-btn" onClick={handleClearFilter}>
            Clear
          </button>
          </div>
         
        </div>
        <div className="attendance-buttons">
          <button className="aadd-attendance-btn" onClick={toggleForm}>
            {editingAttendance ? "Cancel Edit" : "Add Attendance"}
          </button>
          <select
            className="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
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
          <div className="Aattendance-backdrop" onClick={toggleForm}></div>
          <div className="Ppopup-form-container">
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
