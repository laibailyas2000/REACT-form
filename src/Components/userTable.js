import React, { useEffect, useState } from "react";

const UserTable = ({ users, onDelete, onUpdate }) => {
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editData, setEditData] = useState({});

  const handleEdit = (index, user) => {
    setEditableIndex(index);
    setEditData(user);
  };

  const handleSave = (id) => {
    onUpdate(id, editData);
    setEditableIndex(-1);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <table className="table">
      <thead className="heading">
        <tr>
          <th scope="col">S.NO</th>
          <th scope="col">Name</th>
          <th scope="col">Father Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody id="table-body" className="tablebody">
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>
              {editableIndex === index ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editableIndex === index ? (
                <input
                  type="text"
                  name="fname"
                  value={editData.fname}
                  onChange={handleChange}
                />
              ) : (
                user.fname
              )}
            </td>
            <td>
              {editableIndex === index ? (
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editableIndex === index ? (
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
              ) : (
                user.phone
              )}
            </td>
            <td>
              {editableIndex === index ? (
                <button
                  onClick={() => handleSave(user._id)}
                  className="btn btn-success"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(index, user)}
                    className="btn btn-danger"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger delete-btn"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
