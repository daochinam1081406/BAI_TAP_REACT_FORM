import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FormStudent from "./FormStudent";
import ListStudent from "./ListStudent";
import toast, { Toaster } from "react-hot-toast";

const base = "https://650f9b1954d18aabfe9a2079.mockapi.io/api/student";
export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm);

  const timer = useRef();

  useEffect(() => {
    fetchStudents();
  }, [debounceSearchTerm]);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(base, {
        params: {
          name: searchTerm || undefined,
        },
      });
      setStudents(data);
    } catch (error) {}
  };

  const handleAddStudent = async (student) => {
    try {
      const response = await axios.post(base, student);
      setStudents([...students, response.data]);
      toast.success("Student added successfully");
    } catch (error) {
      toast.error("Error creating Student");
    }
  };

  const handleDeteleStudent = async (id) => {
    try {
      const response = await axios.delete(`${base}/${id}`);
      toast.success("Student Deleted Successfully");
      fetchStudents();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const handleSelectStudent = async (id) => {
    try {
      const { data } = await axios.get(`${base}/${id}`);
      setSelectedStudent(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateStudent = async (id, student) => {
    try {
      await axios.put(`${base}/${id}`, student);
      fetchStudents();
      toast.success("Student updated successfully");
    } catch (error) {
      toast.error("Error updating student");
    }
  };

  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setDebounceSearchTerm(evt.target.value);
    }, 300);
  };

  return (
    <>
      <div className="container header-form">
        <p>Thông tin sinh viên</p>
      </div>

      <div className="container">
        <Toaster position="top-right" />
        <FormStudent
          user={selectedStudent}
          onAddStudent={handleAddStudent}
          onUpdateStudent={handleUpdateStudent}
        />

        <div className="my-3">
          <input
            placeholder="Seach by name"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <ListStudent
          student={students}
          onDelete={handleDeteleStudent}
          onEdit={handleSelectStudent}
        />
      </div>
    </>
  );
}
