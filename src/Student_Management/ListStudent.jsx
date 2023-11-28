import React from "react";

export default function ListStudent({ student, onDelete, onEdit }) {
  return (
    <table className="table table-light">
      <thead>
        <tr className="table-dark">
          <th>ID</th>
          <th>Code</th>
          <th>Name</th>
          <th>Phone number</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {student.map(({ id, code, name, phonenumber, email }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{code}</td>
            <td>{name}</td>
            <td>{phonenumber}</td>
            <td>{email}</td>
            <td>
              <button
                className="btn btn-primary me-2"
                onClick={() => onEdit(id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onDelete(id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
