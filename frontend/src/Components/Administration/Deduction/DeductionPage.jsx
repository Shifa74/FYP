import React, { useEffect, useState } from "react";
import DeductionForm from "./DeductionForm";
import DeductionList from "./DeductionList";
import DeductionSummary from "./DeductionSummary";
import "./DeductionPage.css";
import axios from "axios";

const DeductionPage = () => {
  const [deductions, setDeductions] = useState([]); // Initial deductions list
  const [showForm, setShowForm] = useState(false);

  const fetchDeductions = async () => {
    try {
      const res = await axios.get("/deduction/get");
      setDeductions(res.data);
    } catch (error) {
      console.log("Error fetching deductions", error.message);
    }
  };

  useEffect(() => {
    fetchDeductions();
  }, [])

  // Handle form submission to update the deduction list
  const handleFormSubmit = (newDeduction) => {
    setDeductions([...deductions, newDeduction]);
    setShowForm(false); // Close popup after submit
  };

  return (
    <div className="deduction-page-container">
      <div className="heading-button-container">
        <h1 className="deduction-page-title">Deduction Management</h1>

        <button onClick={() => setShowForm(true)} className="open-form-button">
          Add Deduction
        </button>
      </div>

      {showForm && (
        <>
          <div
            className="popup-overlay"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="popup-form-container">
            <DeductionForm
              onSubmit={handleFormSubmit}
              onClose={() => setShowForm(false)}
            />
          </div>
        </>
      )}

      <DeductionList deductions={deductions} />
      <DeductionSummary
        totalDeductions={deductions.reduce(
          (sum, deduction) => sum + deduction.amount,
          0
        )}
      />
    </div>
  );
};

export default DeductionPage;
