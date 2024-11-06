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
  const [currentDeduction, setCurrentDeduction] = useState(null); // Store deduction being edited

  const handleFormSubmit = (newDeduction) => {
    setDeductions([...deductions, newDeduction]);
    setShowForm(false); // Close popup after submit
  };
  const handleEdit = (deduction) => {
    setCurrentDeduction(deduction); // Set deduction to be edited
    setShowForm(true); // Open form
  };

  const handleDelete = (deduction) => {
    setDeductions(deductions.filter(d => d.id !== deduction.id)); // Remove deduction
  };
  return (
    <div className="deduction-page-container">
      <div className="heading-button-container">
        <h1 className="deduction-page-title">Deduction Management</h1>

        <button onClick={() => {
          setCurrentDeduction(null); // Clear current deduction for new entry
          setShowForm(true);
        }} className="open-form-button">
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
            
              deductionData={currentDeduction} // Pass current deduction to form
            />
          </div>
        </>
      )}

      <DeductionList 
        deductions={deductions} 
        onEdit={handleEdit} // Handle edit button click
        onDelete={handleDelete} // Handle delete button click
      />
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
