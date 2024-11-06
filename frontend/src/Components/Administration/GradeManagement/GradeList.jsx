import React, { useState, useEffect } from "react";
import AddGrade from "./AddGrade";
import "./GradeList.css";
import axios from "axios";

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentGradeIndex, setCurrentGradeIndex] = useState(null); // To store the index of the grade being edited

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get("/grade/get");
        setGrades(res.data);
      } catch (error) {
        console.error("Error fetching grade", error.message);
      }
    };
    fetchGrades();
  }, []);

  // Add or update a grade in the list
  const addGrade = (grade) => {
    if (currentGradeIndex) {
      // If editing, replace the current grade
      setGrades((prev) =>
        prev.map((g) => (g._id === grade._id ? grade : g))
      );
    } else {
      // If adding, append the new grade
      setGrades((prev) => [...prev, grade]);
    }
  };

  // Show the AddGrade popup
  const openPopup = (grade = null) => {
    setCurrentGradeIndex(grade);
    setIsPopupOpen(true);
  };

  // Close the AddGrade popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentGradeIndex(null); // Reset on close
  };

  // Delete a grade by id
  const deleteGrade = async (id) => {
    try {
      await axios.delete(`/grade/delete/${id}`);
      const updatedGrades = grades.filter((grade) => grade._id !== id);
      setGrades(updatedGrades);
    } catch (error) {
      console.error("Error deleting grade", error.message);
    }
  };

  return (
    <div className="grade-list-container">
      <div className="header-container">
        <h2>Grade List</h2>
        <button onClick={() => openPopup()} className="add-grade-button">
          Add Grade
        </button>
      </div>

      <table className="grade-table">
        <thead>
          <tr>
            <th>Grade Name</th>
            <th>Base Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade._id}>
              <td>{grade.gradeNo}</td>
              <td>{grade.baseSalary}</td>
              <td>
                <button
                  onClick={() => openPopup(grade)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteGrade(grade._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <AddGrade
          closePopup={closePopup}
          addGrade={addGrade}
          currentGrade={currentGradeIndex} // Pass current grade for editing
        />
      )}
    </div>
  );
};

export default GradeList;
