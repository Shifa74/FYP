import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddUser.css';

const AddEditUser = ({ onSave, initialData, closePopup }) => {
    const [name, setName] = useState(initialData ? initialData.name : '');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: initialData ? initialData.id : null, name });
        closePopup(); // Close the popup after saving
    };

    const handleClose = () => {
        closePopup();
        navigate('/admin'); // Navigate back to the admin page
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-popup" onClick={handleClose}>X</button>
                <h2>{initialData ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit} className="add-edit-user-form">
                    <div className="form-group">
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            id="userName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditUser;
