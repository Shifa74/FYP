import React from "react";
import "./AllowancesAndDeductionDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AllowancesAndDeductionDetails = () => {
  const [details, setDetails] = useState([]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get("/dashboard/allow/deduct/details");
        setDetails(res.data);
      } catch (error) {
        console.log(
          "Error fetching allowance and deduction details",
          error.message
        );
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="allowances-deduction-details-container">
      <h2 className="heading">AllowancesAndDeductionDetails</h2>
      <table className="details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item) => (
            <tr key={item._id}>
              <td>{item.employeeDetails.employeeId}</td>
              <td>
                {item.employeeDetails.firstName} {item.employeeDetails.lastName}
              </td>
              <td>${item.allowanceDetails.amount}</td>
              <td>${Math.round(item.totalDeductions)}</td>
              <td>{new Date(item.createdAt).toISOString().slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllowancesAndDeductionDetails;
