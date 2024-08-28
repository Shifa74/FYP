import React from 'react';
import './UserList.css';
import { Link } from 'react-router-dom';

const UserList = ({ users, onEdit, onDelete }) => {
    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td className="user-actions">
                                <Link to={`/users/edit/${user.id}`} className="edit-button">Edit</Link>
                                <button className="delete-button" onClick={() => onDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/users/add" className="add-user-button">Add User</Link>
        </div>
    );
};

export default UserList;
