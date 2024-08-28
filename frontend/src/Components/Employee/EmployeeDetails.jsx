import React, { useState, useEffect } from 'react';
import ShadowContainer from './ShadowContainer';
import './EmployeeDetails.css';
import { FaUserPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    // Simulated data fetch
    const fetchedData = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1985-06-15",
        departmentName: "HR",
        grade: "A",
        phoneNumber: "+1234567890",
        email: "john.doe@example.com",
        dateOfJoining: "2020-01-01",
        address: "123 Main St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
        {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-07-22",
        departmentName: "Finance",
        grade: "B",
        phoneNumber: "+0987654321",
        email: "jane.smith@example.com",
        dateOfJoining: "2019-03-15",
        address: "456 Elm St, Anytown"
      },
      
      // Add more employee data as needed
    ];
    setEmployees(fetchedData);
  }, []);

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleFormSubmit = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === newEmployee.id ? newEmployee : emp));
    } else {
      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="employee-details-container">
      <div style={{display:"flex"}}>
      <h1 className="heading">Employee Details</h1>
      <div className="add-employee-button-container">
        <div className="add-employee-button" onClick={handleAddEmployeeClick}>
          <FaUserPlus className="icon" />
          <span className="text">Add New Employee</span>
        </div>
      </div>
      </div>
      <div className="employee-details-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th style={{width:'250px'}}>First Name</th>
              <th style={{width:'200px'}}>Last Name</th>
              <th style={{width:'350px'}}>Date of Birth</th>
              <th className="wide-column">Department</th>
              <th className="wide-column">Grade</th>
              <th style={{width:'200px'}}>Phone Number</th>
              <th className="wide-column">Email</th>
              <th style={{width:'350px'}}>Date of Joining</th>
              <th className="wider-column" style={{width:'500px'}}>Address</th>
              <th style={{width:'150px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.departmentName}</td>
                  <td>{employee.grade}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dateOfJoining}</td>
                  <td>{employee.address}</td>
                  <td>
                    <div className="action-icons">
                      <FaEdit 
                        className="action-icon edit-icon" 
                        onClick={() => handleEditClick(employee)} 
                      />
                      <FaTrashAlt 
                        className="action-icon delete-icon" 
                        onClick={() => handleDeleteClick(employee.id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>     
     
      {showForm && <ShadowContainer employee={editingEmployee} onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default EmployeeDetails;
