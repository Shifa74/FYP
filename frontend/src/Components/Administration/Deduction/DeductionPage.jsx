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
    // Add more initial deductions if needed
  ]); // Initial deductions list

  const [showForm, setShowForm] = useState(false);
  const [currentDeduction, setCurrentDeduction] = useState(null); // Store deduction being edited

  const handleFormSubmit = (newDeduction) => {
    if (newDeduction.employeeId) { // Update existing deduction
      setDeductions(deductions.map(deduction => 
        deduction.employeeId === newDeduction.employeeId ? newDeduction : deduction
      ));
    } else { // Add new deduction
      setDeductions([...deductions, newDeduction]);
    }
    setShowForm(false); // Close popup after submit
    setCurrentDeduction(null); // Reset current deduction
  };

  const handleEdit = (deduction) => {
    setCurrentDeduction(deduction); // Set deduction to be edited
    setShowForm(true); // Open form
  };

  const handleDelete = (deduction) => {
    setDeductions(deductions.filter(d => d.employeeId !== deduction.employeeId)); // Remove deduction
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
          <div className="popup-overlay" onClick={() => setShowForm(false)}></div>
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
      <DeductionSummary totalDeductions={deductions.reduce((sum, deduction) => sum + deduction.amount, 0)} />
    </div>
  );
};

export default DeductionPage;
