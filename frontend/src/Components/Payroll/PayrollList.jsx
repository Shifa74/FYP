import React, { useEffect, useState } from "react";
import "./PayrollList.css";
import { FaPrint, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import axios from "axios";

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December"
];


const PayrollList = ({ selectedMonth, selectedYear, onPayrollChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [payrollData, setPayrollData] = useState([]);

  const selectedMonthNumber = monthNames.indexOf(selectedMonth) + 1;

  const fetchPayrollData = async () => {
    const res = await axios.get("/salary/get");
    setPayrollData(res.data);
  };
  useEffect(() => {
    fetchPayrollData();
  }, [selectedMonth, selectedYear]);

  const handleGenerateSlip = async (id, action) => {
     // Find the payroll item that matches the given ID
    const selectedData = payrollData.find((item) => item._id === id);
    try {
      const res = await axios.patch(
        `/salary/confirm-payment/${selectedData._id}`
      );
          
    // Update the payroll data state with the new status and payment date
      setPayrollData((prevData) =>
        prevData.map((item) =>
          item._id === id
            ? { ...item, status: "Paid", paidAt: res.data.paidAt }
            : item
        )
      );
      onPayrollChange();
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return; // Exit if there's an error updating status
      }
    }

    // After updating, generate the slip with the updated status
    if (action === "print") {
      printSlip({ ...selectedData, status: "Paid" });
    } else if (action === "download") {
      downloadSlip({ ...selectedData, status: "Paid" });
    }
  };

  const printSlip = (data) => {
    const printContent = `
  <div>
  <h2>Payroll Details</h2>
  <p><strong>ID: </strong> ${
    data.employeeID ? data.employeeID.employeeId : "N/A"
  }</p>
        <p><strong>Name: </strong> ${
          data.employeeID ? data.employeeID.firstName : "N/A"
        }</p>
        <p><strong>Grade: </strong>${
          data.employeeID ? data.employeeID.gradeNo.gradeNo : "N/A"
        }</p>
        <p><strong>Date: </strong>${new Date(data.createdAt)
          .toISOString()
          .slice(0, 10)}</p>
        <p><strong>Time: </strong> ${new Date(
          data.updatedAt
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
        <p><strong>Salary: </strong>${Math.round(
          data.netSalary
        ).toLocaleString()}</p>
        <p><strong>Status: </strong>${data.status}</p>
      </div>
    `;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(
      "<html><head><title>Print Payroll Slip</title></head><body>"
    );
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const downloadSlip = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payroll Details", 20, 20);
    doc.text(
      `ID: ${data.employeeID ? data.employeeID.employeeId : "N/A"}`,
      20,
      30
    );
    doc.text(
      `Name: ${data.employeeID ? data.employeeID.firstName : "N/A"}`,
      20,
      40
    );
    doc.text(
      `Grade: ${data.employeeID ? data.employeeID.gradeNo.gradeNo : "N/A"}`,
      20,
      50
    );
    doc.text(
      `Date: ${new Date(data.createdAt).toISOString().slice(0, 10)}`,
      20,
      60
    );
    doc.text(
      `Time: ${new Date(data.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      20,
      70
    );
    doc.text(`Salary: ${Math.round(data.netSalary).toLocaleString()}`, 20, 80);
    doc.text(`Status: ${data.status}`, 20, 90);

    doc.save(`${data.employeeID.firstName}_PayrollSlip.pdf`);
  };

  const filteredData = payrollData.filter((item) => {
    return (
      (statusFilter === "All" || item.status === statusFilter) &&
      item.employeeID &&
      item.employeeID.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (selectedMonth === ""|| item.month === selectedMonthNumber ) &&
      (selectedYear === "" || item.year === Number(selectedYear))
    );
  });

  return (
    <div className="payroll-list-container">
      <div className="sticky-header">
        <h2 className="heading">Payroll List</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <div className="filter-buttons">
            <button onClick={() => setStatusFilter("All")}>All Status</button>
            <button onClick={() => setStatusFilter("Paid")}>Paid</button>
            <button onClick={() => setStatusFilter("Pending")}>Pending</button>
          </div>
        </div>
      </div>
      <table className="payroll-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Grade</th>
            <th>Date</th>
            <th>Time</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Pay Slip</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data-cell">
                No payroll records found.
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.employeeID ? item.employeeID.employeeId : "N/A"}</td>
                <td>{item.employeeID ? item.employeeID.firstName : "N/A"}</td>
                <td>
                  {item.employeeID ? item.employeeID.gradeNo.gradeNo : "N/A"}
                </td>
                <td>{new Date(item.createdAt).toISOString().slice(0, 10)}</td>
                <td>
                  {item.status === "Paid"
                       ? new Date(item.paidAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",})
                    : new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </td>
                <td>{Math.round(item.netSalary).toLocaleString()}</td>
                <td>{item.status}</td>

                <td>
                  <FaPrint
                    className={`icon print-icon ${
                      item.status === "Paid" ? "disabled" : ""
                    }`}
                    title="Print"
                    onClick={() => handleGenerateSlip(item._id, "print")}
                    style={{
                      pointerEvents: item.status === "Paid" ? "none" : "auto",
                      opacity: item.status === "Paid" ? 0.5 : 1,
                    }}
                  />
                  <FaDownload
                    className={`icon download-icon ${
                      item.status === "Paid" ? "disabled" : ""
                    }`}
                    title="Download"
                    onClick={() => handleGenerateSlip(item._id, "download")}
                    style={{
                      pointerEvents: item.status === "Paid" ? "none" : "auto",
                      opacity: item.status === "Paid" ? 0.5 : 1,
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;
