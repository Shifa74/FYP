import React from 'react';
import './AddDepartment.css';
import { FaBuilding } from 'react-icons/fa';

const AddDepartment = () => {
  return (
    <div>  
       <a href='/' className="add-department-container">
       <div className="department-icon">
       <FaBuilding size={40}/>
      </div>
      <div className="add-department-text">Add New Department</div>
    </a>
    </div>
   
  );
};

export default AddDepartment;
