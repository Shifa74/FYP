import React, { useState } from 'react';
import './Deduction.css';

const Deduction = () => {
  const [mandatoryDeductions, setMandatoryDeductions] = useState([]);
  const [optionalDeductions, setOptionalDeductions] = useState([]);
  const [deductionType, setDeductionType] = useState('');
  const [deductionCategory, setDeductionCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddDeduction = () => {
    if (deductionType && deductionCategory && amount) {
      const deduction = { type: deductionType, amount };
      if (deductionCategory === 'Mandatory') {
        setMandatoryDeductions([...mandatoryDeductions, deduction]);
      } else {
        setOptionalDeductions([...optionalDeductions, deduction]);
      }
      setDeductionType('');
      setDeductionCategory('');
      setAmount('');
    }
  };

  return (
    <div className="deduction-container">
      <h2>Manage Deductions</h2>
      <div className="deduction-form">
        <div className="form-group">
          <label>Deduction Category:</label>
          <select
            value={deductionCategory}
            onChange={(e) => setDeductionCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Mandatory">Mandatory</option>
            <option value="Optional">Optional</option>
          </select>
        </div>
        <div className="form-group">
          <label>Deduction Type:</label>
          <select
            value={deductionType}
            onChange={(e) => setDeductionType(e.target.value)}
            disabled={!deductionCategory}
          >
            <option value="">Select Deduction Type</option>
            {deductionCategory === 'Mandatory' && (
              <>
                <option value="Tax">Tax</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Retirement Contribution">Retirement Contribution</option>
              </>
            )}
            {deductionCategory === 'Optional' && (
              <>
                <option value="Loan Repayment">Loan Repayment</option>
                <option value="Charity">Charity</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={handleAddDeduction}>Add Deduction</button>
      </div>
      <div className="deduction-list">
        <h3>Mandatory Deductions</h3>
        <ul>
          {mandatoryDeductions.map((deduction, index) => (
            <li key={index}>
              {deduction.type}: ${deduction.amount}
            </li>
          ))}
        </ul>
      </div>
      <div className="deduction-list">
        <h3>Optional Deductions</h3>
        <ul>
          {optionalDeductions.map((deduction, index) => (
            <li key={index}>
              {deduction.type}: ${deduction.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Deduction;
