import React, { useState } from 'react';
import './PayrollList.css';

const PayrollList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const payrollData = [
    { id: 1, name: 'M SHAHRIYAR', role: 'Developer', grade: 'A', date: '2023-07-01', time: '10:00 AM', salary: '$3000', status: 'Paid' },
    { id: 2, name: 'M ALI', role: 'Designer', grade: 'B', date: '2023-07-02', time: '11:00 AM', salary: '$2500', status: 'Pending' },
    { id: 3, name: 'EMAN FATIMA', role: 'Manager', grade: 'A', date: '2023-07-03', time: '12:00 PM', salary: '$4000', status: 'Paid' },
    // Add more sample data as needed
  ];

  const filteredData = payrollData.filter(item => {
    return (
      (statusFilter === 'All' || item.status === statusFilter) &&
      (roleFilter === 'All' || item.role === roleFilter) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="payroll-list-container">
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
          <button onClick={() => setRoleFilter('All')}>All Roles</button>
        </div>
      </div>
      <table className="payroll-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Role</th>
            <th>Grade</th>
            <th>Date</th>
            <th>Time</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.grade}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.salary}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;
