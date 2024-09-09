import React, { useState, useEffect } from "react";
import ShadowContainer from "./ShadowContainer";
import "./EmployeeDetails.css";
import { FaUserPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
 
const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage =9;
  const [departments, setDepartments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/employee/get");
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };

    const fetchDepartmentsAndGrades = async () => {
      try {
        const [deptResponse, gradeResponse] = await Promise.all([
          axios.get("/dept/get"),
          axios.get("/grade/get"),
        ]);
        setDepartments(deptResponse.data);
        setGrades(gradeResponse.data);
      } catch (error) {
        console.error("Error fetching departments and grades", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
    fetchDepartmentsAndGrades();
  }, []);

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleFormSubmit = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp._id === newEmployee._id ? newEmployee : emp
        )
      );
    } else {
      setEmployees([
        ...employees,
        { ...newEmployee, _id: employees.length + 1 },
      ]);
    }
    setShowForm(false);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      // Find the employee to delete based on the id
      const employeeToDelete = employees.find(
        (employee) => employee._id === id
      );
      await axios.delete(`/employee/delete/${employeeToDelete._id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      setFilteredEmployees(
        filteredEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = employees.filter((employee) => {
      if (filterType === "id") {
        return employee.employeeId.toString().includes(value);
      } else if (filterType === "name") {
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
    setFilter("");
    setFilteredEmployees(employees);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees
    ? filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
    : [];

  const totalPages = filteredEmployees
    ? Math.ceil(filteredEmployees.length / employeesPerPage)
    : 0;

  return (
    <div className="employee-details-container">
      <div className="top-bar">
        <h1 className="heading">Employee Details</h1>
        <div className="filter-container">
          <select
            style={{ width: "185px" }}
            value={filterType}
            onChange={handleFilterTypeChange}
          >
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
          <button
            className="add-employee-button"
            onClick={handleAddEmployeeClick}
          >
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
              <th style={{ width: "250px" }}>First Name</th>
              <th style={{ width: "200px" }}>Last Name</th>
              <th style={{ width: "350px" }}>Date of Birth</th>
              <th className="wide-column">Department</th>
              <th className="wide-column">Grade</th>
              <th style={{ width: "200px" }}>Phone Number</th>
              <th className="wide-column">Email</th>
              <th style={{ width: "350px" }}>Date of Joining</th>
              <th className="wider-column" style={{ width: "500px" }}>
                City
              </th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{new Date(employee.dob).toISOString().slice(0, 10)}</td>
                  <td>{employee.deptName ? employee.deptName.name : "N/A"}</td>
                  <td>{employee.gradeNo ? employee.gradeNo.gradeNo : "N/A"}</td>
                  <td>{employee.phoneNo}</td>
                  <td>{employee.email}</td>
                  <td>
                    {new Date(employee.dateOfJoining)
                      .toISOString()
                      .slice(0, 10)}
                  </td>
                  <td>{employee.city}</td>
                  <td>
                    <div className="action-icons">
                      <FaEdit
                        className="action-icon edit-icon"
                        onClick={() => handleEditClick(employee)}
                      />
                      <FaTrashAlt
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteClick(employee._id)}
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
        <div>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        {Array.from({ length: totalPages }, (_, i) => (
          <div>
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`pagination-button ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          </div>
        ))}
        <div>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      {showForm && (
        <ShadowContainer
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          departments={departments}
          grades={grades}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
