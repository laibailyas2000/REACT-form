import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserForm from "./Components/userForm";
import UserTable from "./Components/userTable";
import SignupForm from "./Components/signup";
import LoginForm from "./Components/login";
import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:1000/get");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (formData) => {
    try {
      console.log("Adding user with data:", formData);
      await fetch("http://localhost:1000/formdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      await fetch(`http://localhost:1000/delete/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      console.log("Updating user with ID:", userId, "and data:", updatedData);
      await fetch(`http://localhost:1000/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/user"
          element={
            <>
              <h1>User Management</h1>
              <UserForm onSubmit={addUser} />
              <UserTable
                users={users}
                onDelete={deleteUser}
                onUpdate={updateUser}
              />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
