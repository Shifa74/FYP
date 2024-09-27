import React from "react";
import "./AttendanceList.css"; // Ensure you have styles for the table
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const AttendanceList = ({
  attendanceRecords,
  setAttendanceRecords,
  setEditingAttendance,
}) => {
  const handleEditClick = (record) => {
    setEditingAttendance(record); // Pass the record to be edited
  };

  const handleDeleteClick = async (id) => {
    // Remove record from local state
    try {
      const attendanceToDelete = attendanceRecords.find(
        (record) => record._id === id
      );
      await axios.delete(
        `/attendance/delete/${attendanceToDelete._id}`
      );
      // console.log(response.data);
      setAttendanceRecords(
        attendanceRecords.filter((record) => record._id !== id)
      );
    } catch (error) {
      console.log("error:", error.message)
    }
  };

  return (
    <div className="attendance-list-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>No. of Days Present</th>
            <th>No. of Days Absent</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data-cell">
                No attendance records found.
              </td>
            </tr>
          ) : (
            attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>
                  {record.employeeId ? record.employeeId.employeeId : "N/A"}
                </td>
                <td>{record.presentDays}</td>
                <td>{record.absentDays}</td>
                <td>
                  <div className="action-icons">
                    <FaEdit
                      className="action-icon edit-icon"
                      onClick={() => handleEditClick(record)}
                    />
                    <FaTrashAlt
                      className="action-icon delete-icon"
                      onClick={() => handleDeleteClick(record._id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
