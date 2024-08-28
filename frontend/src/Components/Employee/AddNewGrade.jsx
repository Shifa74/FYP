// AddNewGrade.js
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import './AddNewGrade.css';

const AddNewGrade = () => {
  return (
    
    <div >
      <a href="/" className="add-new-grade-container">   
      <div className="grade-icon">
        <FaPlusCircle size={40} />
      </div>
      <div href='/' className="add-new-grade-text">Add New Grade</div>
      </a>
     
    </div>
  );
};

export default AddNewGrade;
