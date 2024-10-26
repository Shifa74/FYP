import React, { useState } from 'react';
import './AddDepartment.css';

const AddDepartment = ({ closePopup, addDepartment }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            setError('Department name is required');
            return;
        }

        // Create new department object without employees count
        const newDepartment = { name };

        // Call addDepartment to update department list
        addDepartment(newDepartment);

        // Close the popup after submission
        closePopup();
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Add Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="departmentName">Department Name</label>
                        <input
                            className='usersinputs'
                            type="text"
                            id="departmentName"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(''); // Clear error when user types
                            }}
                            placeholder="Enter department name"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Add Department</button>
                    <button type="button" className="cancel-button" onClick={closePopup}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
