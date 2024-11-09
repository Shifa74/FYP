import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './IncentivesAndBonuses.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncentivesAndBonuses = () => {
  const navigate = useNavigate();

  const totalIncentives = 300;
  const totalBonuses = 150;

  const data = {
    labels: ['Incentives', 'Bonuses'],
    datasets: [
      {
        data: [totalIncentives, totalBonuses],
        backgroundColor: ['#64919e', '#f39c12'],
        hoverBackgroundColor: ['#527b87', '#e67e22'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips if not needed
      },
      legend: {
        display: false, // Hide the legend
      },
      datalabels: {
        display: false, // Hide data labels
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleMoreDetails = () => {
    navigate('/incentives-bonuses-details'); // Navigate to the detailed page
  };

  return (
    <div className="incentives-bonuses-container">
      <h2 className="heading">Incentives and Bonuses</h2>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="center-text">
          <p>Total</p>
          <p>${totalIncentives + totalBonuses}</p>
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#64919e' }}></span> Incentives
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f39c12' }}></span> Bonuses
        </div>
      </div>
      <button className="more-details-button" onClick={handleMoreDetails}>More Details</button>
    </div>
  );
};

export default IncentivesAndBonuses;
