import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setIsLoading(true)
    const res = await axios.get("/users/get");
    setUsers(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (user) => {
    try {
      if (user._id) {
        const res = await axios.put(`/users/edit/${user._id}`, user);
        console.log(res.data);
      } else {
        const res = await axios.post("/users/add", user);
        console.log(res.data);
      }
      fetchUsers();
      navigate("/users"); // Navigate back to user list after saving
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`/users/delete/${id}`);
      console.log(res.data);
      fetchUsers();
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserList
            users={users}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser}
            loading={loading}
          />
        }
      />
      <Route path="add" element={<AddUser onSave={handleSaveUser} />} />
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
