import React, { useState, useEffect } from 'react';
import './AddUser.css';
import { useNavigate } from 'react-router-dom';

const AddEditUser = ({ onSave, initialData }) => {
    const [name, setName] = useState(initialData ? initialData.name : '');
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: initialData ? initialData.id : null, name });
        navigate('/users');
    };

    return (
        <div className="add-edit-user-container">
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
                    <button type="button" className="cancel-button" onClick={() => navigate('/users')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditUser;
