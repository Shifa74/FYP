import React, { useState } from 'react';
import './UserList.css';
import AddEditUser from './AddUser';

const UserList = ({ users, onSave, onDelete, loading }) => {
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
            <div className="user-list-header">
                <h2 className='userlist-heading'>User List</h2>
                <button className="add-user-button" onClick={() => openPopup()}>Add User</button>
            </div>
            
            <div className="user-table-container">
                <table className="user-table">
                    {loading && <p style={{"text-align":"center"}}>Loading...</p>}
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="user-actions">
                                    <button className="useredit-button" onClick={() => openPopup(user)}>Edit</button>
                                    <button className="userdelete-button" onClick={() => onDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
