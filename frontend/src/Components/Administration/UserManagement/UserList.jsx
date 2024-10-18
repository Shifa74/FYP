import React, { useState } from 'react';
import './UserList.css';
import AddEditUser from './AddUser';

const UserList = ({ users, onSave, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const openPopup = (user = null) => {
        setUserToEdit(user);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setUserToEdit(null);
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th> {/* Add Email column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td> {/* Display Email */}
                            <td className="user-actions">
                                <button className="edit-button" onClick={() => openPopup(user)}>Edit</button>
                                <button className="delete-button" onClick={() => onDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-user-button" onClick={() => openPopup()}>Add User</button>

            {/* AddEditUser Popup */}
            {showPopup && (
                <AddEditUser 
                    onSave={onSave} 
                    initialData={userToEdit} 
                    closePopup={closePopup} 
                />
            )}
        </div>
    );
};

export default UserList;
