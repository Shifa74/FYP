import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setIsLoading(true);
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
        await axios.put(`/users/edit/${user._id}`, user);
      } else {
        await axios.post("/users/add", user);
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
    
          <UserList
            users={users}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser}
            loading={loading}
          />
      
  );
};



export default UserManagement;
