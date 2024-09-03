import React, { useState, useEffect, } from 'react';
import ShadowContainer from './ShadowContainer';
import './EmployeeDetails.css';
import { FaUserPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 9;



  useEffect(() => {
    const fetchEmployees = async () => {
      // Simulated data fetch
      const fetchedData = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1985-06-15',
          departmentName: 'HR',
          grade: 'A',
          phoneNumber: '+1234567890',
          email: 'john.doe@example.com',
          dateOfJoining: '2020-01-01',
          city: '123 Main St, Anytown',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          dateOfBirth: '1990-07-22',
          departmentName: 'Finance',
          grade: 'B',
          phoneNumber: '+0987654321',
          email: 'jane.smith@example.com',
          dateOfJoining: '2019-03-15',
          city: '456 Elm St, Anytown',
        },
        // Other employee objects...
      ];
      setEmployees(fetchedData);
      setFilteredEmployees(fetchedData);
    };
    fetchEmployees();
  }, []);

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleFormSubmit = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === newEmployee.id ? newEmployee : emp
        )
      );
    } else {
      setEmployees([
        ...employees,
        { ...newEmployee, id: employees.length + 1 },
      ]);
    }
    setShowForm(false);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== id));
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = employees.filter((employee) => {
      if (filterType === 'id') {
        return employee.id.toString().includes(value);
      } else if (filterType === 'name') {
        return (
          employee.firstName.toLowerCase().includes(value) ||
          employee.lastName.toLowerCase().includes(value)
        );
      }
      return false;
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilter('');
    setFilteredEmployees(employees);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="employee-details-container">
      <div className="top-bar">
        <h1 className="heading">Employee Details</h1>
        <div className="filter-container">
          <select style={{ width: '185px' }} value={filterType} onChange={handleFilterTypeChange}>
            <option value="id">Filter by ID</option>
            <option value="name">Filter by Name</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${filterType}`}
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div className="add-employee-button-container">
          <button className="add-employee-button" onClick={handleAddEmployeeClick}>
            <FaUserPlus className="icon" />
            <span className="text">Add New Employee</span>
          </button>
        </div>
      </div>
      <div className="employee-details-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th style={{ width: '250px' }}>First Name</th>
              <th style={{ width: '200px' }}>Last Name</th>
              <th style={{ width: '350px' }}>Date of Birth</th>
              <th className="wide-column">Department</th>
              <th className="wide-column">Grade</th>
              <th style={{ width: '200px' }}>Phone Number</th>
              <th className="wide-column">Email</th>
              <th style={{ width: '350px' }}>Date of Joining</th>
              <th className="wider-column" style={{ width: '500px' }}>City</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
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
                  <td>{employee.city}</td>
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
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      {showForm && (
        <ShadowContainer
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
        
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
