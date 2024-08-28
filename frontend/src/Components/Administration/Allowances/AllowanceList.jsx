import React from 'react';
import { Link } from 'react-router-dom';

const AllowanceList = () => {
    return (
        <div>
            <h2>Allowances</h2>
            <button><Link to="/allowances/add">Add Allowance</Link></button>
            <ul>
                {/* Allowance items will be mapped here */}
                <li>Allowance 1</li>
                <li>Allowance 2</li>
            </ul>
        </div>
    );
}

export default AllowanceList;
