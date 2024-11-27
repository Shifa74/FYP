import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddGrade.css"

const AddGrade = ({ closePopup, addGrade, currentGrade }) => {
  const [gradeNo, setGradeNo] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentGrade) {
      setGradeNo(currentGrade.gradeNo);
      setBaseSalary(currentGrade.baseSalary);
    } else {
      setGradeNo("");
      setBaseSalary("");
    }
  }, [currentGrade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Client-side validation
  if (!gradeNo.trim() || !baseSalary.trim() || Number(baseSalary) <= 0) {
    setError("Please enter a valid grade number and a positive base salary.");
    return;
  }
    const grade = { gradeNo, baseSalary };
    try {
      let res;
      if (currentGrade && currentGrade._id) {
        res = await axios.put(`/grade/edit/${currentGrade._id}`, grade);
      } else {
        res = await axios.post("/grade/add", grade);
      }
      addGrade(res.data);
      closePopup();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === "backdrop") {
      closePopup();
    }
  };

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="add-grade-popup">
        <h2>{currentGrade ? "Edit Grade" : "Add Grade"}</h2>
        <form onSubmit={handleSubmit} noValidate>
            {error && <p className="grade-error-message">{error}</p>}
          <div className="form-group">
            <label>Grade No</label>
            <input
              type="text"
              value={gradeNo}
              onChange={(e) => {
                setGradeNo(e.target.value);
                setError("");
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Base Salary</label>
            <input
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-grade-submit-button">
            {currentGrade ? "Update" : "Add"}
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default AddGrade;
