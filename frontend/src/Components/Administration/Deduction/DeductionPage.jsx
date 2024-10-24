import React, { useState } from 'react';
import DeductionForm from './DeductionForm';
import DeductionList from './DeductionList';
import DeductionSummary from './DeductionSummary';
import './DeductionPage.css';

const DeductionPage = () => {
  const [deductions, setDeductions] = useState([
    { employeeId: 1, deductionType: 'Tax', amount: 200 },
    { employeeId: 2, deductionType: 'Insurance', amount: 150 },
    { employeeId: 1, deductionType: 'Tax', amount: 200 },
    { employeeId: 2, deductionType: 'Insurance', amount: 150 },
    { employeeId: 1, deductionType: 'Tax', amount: 200 },
    { employeeId: 2, deductionType: 'Insurance', amount: 150 },
  ]); // Initial deductions list

  const [showForm, setShowForm] = useState(false);

  // Handle form submission to update the deduction list
  const handleFormSubmit = (newDeduction) => {
    setDeductions([...deductions, newDeduction]);
    setShowForm(false);  // Close popup after submit
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
          <div className="popup-overlay" onClick={() => setShowForm(false)}></div>
          <div className="popup-form-container">
            <DeductionForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
          </div>
        </>
      )}

      <DeductionList deductions={deductions} />
      <DeductionSummary totalDeductions={deductions.reduce((sum, deduction) => sum + deduction.amount, 0)} />
    </div>
  );
};

export default DeductionPage;
