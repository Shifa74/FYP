import React, { useState } from 'react';
import './PayrollList.css';
import { FaPrint, FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const PayrollList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [payrollData, setPayrollData] = useState([
    { id: 1, name: 'M SHAHRIYAR', grade: 'A', date: '2023-07-01', time: '10:00 AM', salary: '$3000', status: 'Pending' },
    { id: 2, name: 'M ALI', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 3, name: 'EMAN FATIMA', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Pending' },
    // Add more data as needed
  ]);

  const handleGenerateSlip = (id, action) => {
    const selectedData = payrollData.find(item => item.id === id);

    if (action === 'print') {
      printSlip(selectedData);
    } else if (action === 'download') {
      downloadSlip(selectedData);
    }

    setPayrollData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: 'Paid' } : item
      )
    );
  };

  const printSlip = (data) => {
    const printContent = `
      <div>
        <h2>Payroll Details</h2>
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Grade: ${data.grade}</p>
        <p>Date: ${data.date}</p>
        <p>Time: ${data.time}</p>
        <p>Salary: ${data.salary}</p>
        <p>Status: ${data.status}</p>
      </div>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print Payroll Slip</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const downloadSlip = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Payroll Details', 20, 20);
    doc.text(`ID: ${data.id}`, 20, 30);
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Grade: ${data.grade}`, 20, 50);
    doc.text(`Date: ${data.date}`, 20, 60);
    doc.text(`Time: ${data.time}`, 20, 70);
    doc.text(`Salary: ${data.salary}`, 20, 80);
    doc.text(`Status: ${data.status}`, 20, 90);

    doc.save(`${data.name}_PayrollSlip.pdf`);
  };

  const filteredData = payrollData.filter(item => {
    return (
      (statusFilter === 'All' || item.status === statusFilter) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="payroll-list-container">
      <div className="sticky-header">
        <h2 className="heading">Payroll List</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <div className="filter-buttons">
            <button onClick={() => setStatusFilter('All')}>All Status</button>
            <button onClick={() => setStatusFilter('Paid')}>Paid</button>
            <button onClick={() => setStatusFilter('Pending')}>Pending</button>
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
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.grade}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.salary}</td>
              <td>{item.status}</td>
              <td>
                <FaPrint
                  className="icon print-icon"
                  title="Print"
                  onClick={() => handleGenerateSlip(item.id, 'print')}
                />
                <FaDownload
                  className="icon download-icon"
                  title="Download"
                  onClick={() => handleGenerateSlip(item.id, 'download')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;
