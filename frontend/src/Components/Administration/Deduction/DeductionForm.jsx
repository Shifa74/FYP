import React, { useState, useEffect } from 'react';
import './DeductionForm.css';

const DeductionForm = ({ onSubmit, onClose, deductionData }) => {
  const [deductionType, setDeductionType] = useState('');
  const [amount, setAmount] = useState('');

  const deductionOptions = ['Tax', 'Insurance', 'Retirement', 'Other']; // Dropdown options

  // Use effect to set the form fields when editing
  useEffect(() => {
    if (deductionData) {
      setDeductionType(deductionData.deductionType);
      setAmount(deductionData.amount);
    }
  }, [deductionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeduction = { ...deductionData, deductionType, amount: Number(amount) }; // Update existing deduction
    onSubmit(newDeduction);  // Pass the new deduction up to the parent component
    onClose(); // Close the popup after submitting
  };

  return (
    <div className="deduction-popup-overlay">
      <div className="deduction-popup">
        <button onClick={onClose} className="deduction-form-close">&times;</button>
        <h2>{deductionData ? 'Edit Deduction' : 'Add Deduction'}</h2>
        <form className="deduction-form-container" onSubmit={handleSubmit}>
          <div className="deduction-form-group">
            <label htmlFor="deductionType" className="deduction-form-label">Deduction Type</label>
            <select
              id="deductionType"
              className="deduction-form-input"
              value={deductionType}
              onChange={(e) => setDeductionType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              {deductionOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="deduction-form-group">
            <label htmlFor="amount" className="deduction-form-label">Amount</label>
            <input
              type="number"
              id="amount"
              className="deduction-form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="deduction-form-submit">
            {deductionData ? 'Update Deduction' : 'Add Deduction'} {/* Change button text based on context */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeductionForm;
