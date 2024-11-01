import React, { useState } from 'react';
import AddGrade from './AddGrade';
import './GradeList.css';

const GradeList = () => {
    const [grades, setGrades] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentGradeIndex, setCurrentGradeIndex] = useState(null); // To store the index of the grade being edited

    // Add or update a grade in the list
    const addGrade = (grade) => {
        if (currentGradeIndex !== null) {
            // If editing, replace the current grade
            const updatedGrades = grades.map((g, index) =>
                index === currentGradeIndex ? grade : g
            );
            setGrades(updatedGrades);
            setCurrentGradeIndex(null); // Reset currentGradeIndex after updating
        } else {
            // If adding, append the new grade
            setGrades([...grades, grade]);
        }
    };

    // Show the AddGrade popup
    const openPopup = (index = null) => {
        if (index !== null) {
            setCurrentGradeIndex(index);
        }
        setIsPopupOpen(true);
    };

    // Close the AddGrade popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentGradeIndex(null); // Reset on close
    };

    // Delete a grade by index
    const deleteGrade = (index) => {
        const updatedGrades = grades.filter((_, i) => i !== index);
        setGrades(updatedGrades);
    };

    return (
        <div className="grade-list-container">
            <div className="header-container">
                <h2>Grade List</h2>
                <button onClick={() => openPopup()} className="add-grade-button">Add Grade</button>
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
                    {grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{grade.gradeName}</td>
                            <td>{grade.baseSalary}</td>
                            <td>
                                <button onClick={() => openPopup(index)} className="edit-button">Edit</button>
                                <button onClick={() => deleteGrade(index)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isPopupOpen && (
                <AddGrade
                    closePopup={closePopup}
                    addGrade={addGrade}
                    currentGrade={grades[currentGradeIndex]} // Pass current grade for editing
                />
            )}
        </div>
    );
};

export default GradeList;
