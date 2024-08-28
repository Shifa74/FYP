import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUser from './AddUser';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleSaveUser = (user) => {
        const updatedUsers = user.id
            ? users.map(u => (u.id === user.id ? user : u))
            : [...users, { ...user, id: users.length ? users[users.length - 1].id + 1 : 1 }];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        navigate('/users');  // Navigate back to user list after saving
    };

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<UserList users={users} onDelete={handleDeleteUser} />}
            />
            <Route
                path="add"
                element={<AddUser onSave={handleSaveUser} />}
            />
            <Route
                path="edit/:id"
                element={<EditUser onSave={handleSaveUser} users={users} />}
            />
        </Routes>
    );
};

const EditUser = ({ onSave, users }) => {
    const { id } = useParams();
    const user = users.find((u) => u.id === parseInt(id, 10));
    return <AddUser onSave={onSave} initialData={user} />;
};

export default UserManagement;
