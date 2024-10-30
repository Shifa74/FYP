import React, { useState } from 'react';
import './AddGrade.css'; // Import the unique CSS for the AddGrade component

const AddGrade = ({ closePopup }) => {
    const [gradeName, setGradeName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Grade:', { gradeName });

        setGradeName('');
        closePopup();
    };

    // Prevent click events on the popup from propagating to the backdrop
    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="backdrop" onClick={closePopup}>
            <div className="add-grade-popup" onClick={handlePopupClick}>
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
                    <button type="submit" className="submit-button">Add Grade</button>
                </form>
            </div>
        </div>
    );
};

export default AddGrade;
