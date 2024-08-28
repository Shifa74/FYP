import React from 'react';
import { Link } from 'react-router-dom';

const DeductionList = () => {
    return (
        <div>
            <h2>Deductions</h2>
            <button><Link to="/deductions/add">Add Deduction</Link></button>
            <ul>
                {/* Deduction items will be mapped here */}
                <li>Deduction 1</li>
                <li>Deduction 2</li>
            </ul>
        </div>
    );
}

export default DeductionList;
