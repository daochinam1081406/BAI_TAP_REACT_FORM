import React, { useState, useEffect } from "react";

const emptyValue = {
  id: "",
  code: "",
  name: "",
  phonenumber: "",
  email: "",
};
export default function FormStudent({
  student,
  onAddStudent,
  onUpdateStudent,
}) {
  const [value, setValue] = useState(emptyValue);

  useEffect(() => {
    if (!student) return;

    setValue(student);
  }, [student]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.id) {
      // Cập nhật
      const { id, ...student } = value;
      onUpdateStudent(id, student);
    } else {
      // Thêm mới
      onAddStudent(value);
    }

    setValue(emptyValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Name"
          value={value.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          className="form-control"
          name="account"
          id="account"
          placeholder="Account"
          value={value.account}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          name="password"
          id="password"
          placeholder="Password"
          value={value.password}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
