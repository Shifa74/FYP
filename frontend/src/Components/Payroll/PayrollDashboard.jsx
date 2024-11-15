import React, { useState, useEffect } from "react";
import "./PayrollDashboard.css";
import GenerateSalary from "./GenerateSalary";
import PayrollList from "./PayrollList";
import axios from "axios";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PayrollDashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const defaultMonth = monthNames[new Date().getMonth()]; // Get the current month name
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth); // Month state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // default to current year
  const [payrollSummary, setPayrollSummary] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    setSelectedMonth(defaultMonth); // Set selected month to default when component loads
  }, [defaultMonth]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const monthNumber = monthNames.indexOf(selectedMonth) + 1;
        const res = await axios.get("/salary/summary", {
          params: { month: monthNumber, year: selectedYear },
        });
        setPayrollSummary(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.log(error.response.data.message);
        }
      }
    };

    fetchSummary();
  }, [selectedMonth, selectedYear, refresh]);

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const handleYearChange = (e) => setSelectedYear(e.target.value);

  // Generate a list of years (e.g., from 2020 to current year)
  const yearOptions = [];
  for (let i = 2020; i <= new Date().getFullYear() + 3; i++) {
    yearOptions.push(i);
  }

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="payroll-dashboard-header">
        <h1>Payroll Management</h1>

        {/* {Filters Section */}
        <div className="payroll-header-filters">
          <label>
            Month:
            <select value={selectedMonth} onChange={handleMonthChange}>
              {monthNames.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>
          <label>
            Year:
            <select value={selectedYear} onChange={handleYearChange}>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label> 
         </div>  

        {/* Generate Salary Button  */}
        <button
          onClick={handleOpenPopup}
          className="payroll-generate-salary-button"
        >
          Generate Salary
        </button>

         {/* Popup Overlay  */}
        {isPopupOpen && (
          <div className="payroll-popup-overlay" onClick={handleClosePopup}>
            <div
              className="payroll-popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <GenerateSalary onClose={handleClosePopup} />
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Cards */}
      <div className="payroll-dashboard">
        <div className="payroll-dashboard-card">
          <h3>Payroll Costs</h3>
          <p>${Math.round(payrollSummary.payrollCosts).toLocaleString()}</p>
        </div>
        <div className="payroll-dashboard-card">
          <h3>Pending Payments</h3>
          <p>${Math.round(payrollSummary.pendingPayments).toLocaleString()}</p>
        </div>
        <div className="payroll-dashboard-card">
          <h3>Total Payrolls</h3>
          <p>{payrollSummary.totalPayrolls}</p>
        </div>
      </div>
      <div>
        {/* <h2>PayrollList Details</h2> */}
        <PayrollList
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onPayrollChange={triggerRefresh}
        />
      </div>
    </div>
  );
};

export default PayrollDashboard;
