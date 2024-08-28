import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './GradeWiseSalary.css';

const GradeWiseSalary = () => {
  const [gradeWiseSalary, setGradeWiseSalary] = useState([]);

  useEffect(() => {
    // Simulated data fetching
    const fetchGradeWiseSalary = () => {
      setGradeWiseSalary([
        { grade: '9', salary: 1 },
        { grade: '8', salary: 2 },
        { grade: '7', salary: 3 },
        { grade: '6', salary: 4 },
        { grade: '5', salary: 3.5 },
        { grade: '4', salary: 2.5 },
        { grade: '3', salary: 1.5 },
        { grade: '2', salary: 1.2 },
        { grade: '1', salary: 1.8 },
      ]);
    };

    fetchGradeWiseSalary();
  }, []);

  return (
    <div className="grade-wise-salary-card">
      <h2>Grade-wise Salary</h2>
      <p className="description">Salary distribution by grade</p>
      <div className="graph-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gradeWiseSalary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis tickFormatter={(value) => `${value} lac`} />
              
            <Tooltip formatter={(value) => `${value} lac`} />
            <Bar dataKey="salary" fill="#64919e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradeWiseSalary;
