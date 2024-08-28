import React from 'react';
import './EmployeeGrades.css';

const EmployeeGrades = ({ gradesData }) => {
    return (
        <div className="employee-grades-container">
            <div className="header">
                <div className="title-section">
                    <h4 className="heading">Number of Employees</h4>
                    <p className='subtitle'>Department or Grade wise</p>
                </div>
                <select className="grade-dropdown">
                    {gradesData.map((grade, index) => (
                        <option key={index} value={index + 1}>Grade {index + 1}</option>
                    ))}
                </select>
            </div>
            <div className="employee-grades">
                {gradesData.map((grade, index) => (
                    <div key={index} className="grade-item">
                        <div className="grade-box">
                          <h3>Grade {index + 1}</h3>
                        </div>
                        <p className="employee-count">{grade.numberOfEmployees}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeGrades;
