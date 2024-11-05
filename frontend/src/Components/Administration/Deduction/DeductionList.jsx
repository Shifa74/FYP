import React from "react";
import "./DeductionList.css";

const DeductionList = ({ deductions, onEdit, onDelete }) => {
  return (
    <div className="deduction-list-container">
      <h2 className="deduction-list-title">Employee Deductions</h2>
      <table className="deduction-list-table">
        <thead>
          <tr>
            <th>Deduction Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deductions.map((deduction) => (
            <tr key={deduction._id}>
              <td>{deduction.deductionType}</td>
              <td>${deduction.amount.toFixed(2)}</td>
              <td>
                <button 
                  className="deduction-edit-btn"
                  onClick={() => onEdit(deduction._id)} // Pass the deduction to edit
                >
                  Edit
                </button>
                <button 
                  className="deduction-delete-btn"
                  onClick={() => onDelete(deduction._id)} // Pass the deduction to delete
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeductionList;
