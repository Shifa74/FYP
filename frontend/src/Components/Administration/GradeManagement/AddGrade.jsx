import React, { useState, useEffect } from 'react';

const AddGrade = ({ closePopup, addGrade, currentGrade }) => {
    const [gradeName, setGradeName] = useState('');
    const [baseSalary, setBaseSalary] = useState('');

    useEffect(() => {
        if (currentGrade) {
            setGradeName(currentGrade.gradeName);
            setBaseSalary(currentGrade.baseSalary);
        } else {
            setGradeName('');
            setBaseSalary('');
        }
    }, [currentGrade]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const grade = { gradeName, baseSalary };
        addGrade(grade);
        closePopup();
    };

    const handleBackdropClick = (e) => {
        if (e.target.className === 'backdrop') {
            closePopup();
        }
    };

    return (
        <div className="backdrop" onClick={handleBackdropClick}>
            <div className="add-grade-popup">
                <h2>{currentGrade ? 'Edit Grade' : 'Add Grade'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Grade Name</label>
                        <input
                            type="text"
                            value={gradeName}
                            onChange={(e) => setGradeName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Base Salary</label>
                        <input
                            type="number"
                            value={baseSalary}
                            onChange={(e) => setBaseSalary(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">{currentGrade ? 'Update' : 'Add'}</button>
                </form>
                <button onClick={closePopup} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default AddGrade;
