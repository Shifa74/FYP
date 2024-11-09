import React, { useState } from 'react';
import './PayrollList.css';
import { FaPrint, FaDownload } from 'react-icons/fa';

const PayrollList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [payrollData, setPayrollData] = useState([
    { id: 1, name: 'M SHAHRIYAR', grade: 'A', date: '2023-07-01', time: '10:00 AM', salary: '$3000', status: 'Pending' },
    { id: 2, name: 'M ALI', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 3, name: 'EMAN FATIMA', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Pending' },
    { id: 4, name: 'YASHA', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 5, name: 'SHIFA', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Pending' },
    { id: 4, name: 'ABEEHA', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 5, name: 'ZOHA', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Pending' },
    { id: 4, name: 'YASHA', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 5, name: 'SHIFA', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Pending' },
    { id: 4, name: 'ABEEHA', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 5, name: 'ZOHA', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Pending' },
  ]);

  const handleGenerateSlip = (id) => {
    setPayrollData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: 'Paid' } : item
      )
    );
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
                  onClick={() => handleGenerateSlip(item.id)}
                />
                <FaDownload
                  className="icon download-icon"
                  title="Download"
                  onClick={() => handleGenerateSlip(item.id)}
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
