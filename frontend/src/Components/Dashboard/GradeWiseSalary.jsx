import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./GradeWiseSalary.css";
import axios from "axios";

const GradeWiseSalary = () => {
  const [gradeWiseSalary, setGradeWiseSalary] = useState([]);

  useEffect(() => {
    const fetchGradeWiseSalary = async () => {
      try {
        const res = await axios.get("/grade/get");
        const formattedData = res.data.map((item) => ({
          grade: item.gradeNo,
          salary: item.baseSalary 
        }));
        setGradeWiseSalary(formattedData);
      } catch (error) {
        console.error("Error fetching grade-wise salary data:", error);
      }
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
            <YAxis tickFormatter={(value) => `${value}`} />
            <Tooltip formatter={(value) => `${value} thousand`} />
            <Bar dataKey="salary" fill="#64919e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradeWiseSalary;
