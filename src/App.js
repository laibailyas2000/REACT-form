import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import UserForm from "./Components/userForm";
import UserTable from "./Components/userTable";

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
      <div className="App container">
        <Routes>
          <Route
            path="/"
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
      </div>
    </Router>
  );
}

export default App;
