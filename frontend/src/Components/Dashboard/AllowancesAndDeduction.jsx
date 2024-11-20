import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./AllowancesAndDeduction.css";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const AllowancesAndDeduction = () => {
  const navigate = useNavigate();
  const [totalAllowances, setTotalAllowances] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);

  useEffect(() => {
    const fetchAllowAndDeduct = async () => {
      try {
        const res = await axios.get("/dashboard/allow/deduct");
        setTotalAllowances(Number(res.data.totalAllowances));
        setTotalDeductions(Math.round(Number(res.data.totalDeductions)));
      } catch (error) {
        if (error.response.data.message) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchAllowAndDeduct();
  }, []);

  const data = {
    labels: ["Allowances", "Deduction"],
    datasets: [
      {
        data: [totalAllowances, totalDeductions],
        backgroundColor: ["#f39c12", "#64919e"],
        hoverBackgroundColor: ["#11b1e2", "#0beff7"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true, // Disable tooltips if not needed
      },
      legend: {
        display: false, // Hide the legend
      },
      datalabels: {
        display: false, // Hide data labels
      },
    },
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false, // Allows better sizing
  };

  const handleMoreDetails = () => {
    navigate("/Allowances-Deduction-details"); // Navigate to the detailed page
  };

  return (
    <div className="Allowances-Deduction-container">
      <h2 className="A-d-heading">Allowances And Deduction</h2>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="center-text">
          <p>Total</p>
          <p>${(totalAllowances + totalDeductions).toLocaleString()}</p>
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#f39c12" }}
          ></span>{" "}
          Allowances
        </div>
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: " #64919e" }}
          ></span>{" "}
          Deduction
        </div>
      </div>
      <button className="more-details-button" onClick={handleMoreDetails}>
        More Details
      </button>
    </div>
  );
};

export default AllowancesAndDeduction;
