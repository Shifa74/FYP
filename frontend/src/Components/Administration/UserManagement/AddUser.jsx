import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

const AddEditUser = ({ onSave, initialData, closePopup }) => {
    const [name, setName] = useState(initialData ? initialData.name : '');
    const [email, setEmail] = useState(initialData ? initialData.email : '');
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
        }
    }, [initialData]);

    useEffect(() => {
        console.log('Received closePopup function:', closePopup); // Add logging
    }, [closePopup]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            id: initialData ? initialData.id : null, 
            name, 
            email 
        });
        closePopup(); // Ensure closePopup is triggered here
    };

    const handleClose = () => {
        console.log('Closing popup'); // Add logging
        closePopup(); // Correct closePopup function
        navigate('/users'); // Navigate back to the admin page
    };

    return (
        <div className="userpopup-overlay">
            <div className="userpopup">
                <h2 className='user_heading'>{initialData ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit} className="add-edit-user-form">
                    <div className="form-group">
                        <label className='user_labellabel' htmlFor="userName">User Name:</label>
                        <input
                        className='user_input'
                            type="text"
                            id="userName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='user_label' htmlFor="userEmail">Email:</label>
                        <input
                        className='user_inputinput'
                            type="email"
                            id="userEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter user email"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="user-submit-button">Save</button>
                        <button type="button" className="user-cancel-button" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditUser;
