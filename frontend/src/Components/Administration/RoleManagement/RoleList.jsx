import React from 'react';
import { Link } from 'react-router-dom';

const RoleList = () => {
    return (
        <div>
            <h2>Roles</h2>
            <button><Link to="/roles/add">Add Role</Link></button>
            <ul>
                {/* Role items will be mapped here */}
                <li>Role 1</li>
                <li>Role 2</li>
            </ul>
        </div>
    );
}

export default RoleList;
