import React, { useState } from 'react';
import './AddDepartment.css';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [name, setName] = useState('');
    const [employees, setEmployees] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            setError('Department name is required');
            return;
        }

        const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        const newDepartment = {
            id: storedDepartments.length ? storedDepartments[storedDepartments.length - 1].id + 1 : 1,
            name,
            employees: parseInt(employees, 10)
        };
        const updatedDepartments = [...storedDepartments, newDepartment];
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));

        navigate('/departments');
    };

    return (
        <div className="add-department-container">
            <h2>Add Department</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="departmentName">Department Name</label>
                    <input
                        type="text"
                        id="departmentName"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter department name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeCount">Number of Employees</label>
                    <input
                        type="number"
                        id="employeeCount"
                        value={employees}
                        onChange={(e) => setEmployees(e.target.value)}
                        placeholder="Enter number of employees"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Add Department</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/departments')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
