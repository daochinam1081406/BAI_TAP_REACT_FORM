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
      <div className="row">
        <div className="form-group col-md-6 mb-2">
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <input
            type="text"
            name="code"
            className="form-control"
            id="code"
            placeholder="code"
            value={value.code}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6 mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="full name"
            value={value.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6 mb-2">
          <label htmlFor="phonenumber" className="form-label">
            Phone number
          </label>
          <input
            type="text"
            className="form-control"
            name="phonenumber"
            id="phonenumber"
            placeholder="phone number"
            value={value.phonenumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6 mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            placeholder="email"
            value={value.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
