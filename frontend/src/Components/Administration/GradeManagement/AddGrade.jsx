import React, { useState } from 'react';
import './AddGrade.css'; // Import the unique CSS for the AddGrade component

const AddGrade = ({ closePopup }) => {
    const [gradeName, setGradeName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally handle the submission to your API or state management
        console.log('New Grade:', { gradeName, description });
        
        // Clear fields after submission
        setGradeName('');
        setDescription('');
        
        // Close the popup
        closePopup();
    };

    return (
        <div className="add-grade-popup">
            <h2>Add New Grade</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="gradeName">Grade Name:</label>
                    <input
                        type="text"
                        id="gradeName"
                        value={gradeName}
                        onChange={(e) => setGradeName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Add Grade</button>
            </form>
            <button className="close-popup" onClick={closePopup}>X</button>
        </div>
    );
};

export default AddGrade;
