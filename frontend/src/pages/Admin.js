import React, { useState, useEffect } from "react";
import FacultyForm from "../components/FacultyForm";
import Navbar from "../components/Navbar";


const Admin = () => {
  const [facultyDetails, setFacultyDetails] = useState([]);

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await fetch("/api/users"); // Assuming this endpoint exists
        if (!response.ok) {
          throw new Error("Failed to fetch faculty details");
        }
        const data = await response.json();
        setFacultyDetails(data);
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      }
    };

    fetchFacultyDetails();
  }, []);

  const updateFacultyList = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch faculty details");
      }
      const data = await response.json();
      setFacultyDetails(data);
    } catch (error) {
      console.error("Error updating faculty list:", error);
    }
  };

  const handleDelete = async (username) => {
    try {
      console.log(`/api/users/${username}`);
      const response = await fetch(`/api/users/${username}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete faculty member");
      }
      // Remove the deleted faculty member from the state
      setFacultyDetails((prevDetails) =>
        prevDetails.filter((faculty) => faculty.username !== username)
      );
    } catch (error) {
      console.error("Error deleting faculty member:", error);
    }
  };

  return (
    <div className="admin">
      <Navbar/>
      <br/>
      <h1>Hello, Admin!</h1>
      <div className="workouts">
        <h2>Faculty Details:</h2>
        <ul>
          {facultyDetails.map((faculty) => (
            <div className="workout-details" key={faculty.username}>
              <h4>{faculty.fullname}</h4>
              <p>
                <strong>Username: </strong>
                {faculty.username}
              </p>
              <p>
                <strong>Email: </strong>
                {faculty.email}
              </p>
              <button className="material-symbols-outlined" onClick={() => handleDelete(faculty.username)}>
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
      <FacultyForm updateFacultyList={updateFacultyList} />
    </div>
  );
};

export default Admin;
