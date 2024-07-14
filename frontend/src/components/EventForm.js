import React, { useState, useEffect } from "react";
import "./components.css"; // Import the CSS file

const EventForm = ({ updateEventList }) => {
  // Define state variables to store form data
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    facultyMentorUsername: ""
  });

  // State variables for dropdown options
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users to populate the faculty dropdown
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Make a POST request to create a new event
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      // Reset form after successful submission
      setFormData({
        eventName: "",
        eventDate: "",
        eventTime: "",
        venue: "",
        facultyMentorUsername: ""
      });
      // Update the list of events
      updateEventList();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Event</h3>
      <input
        type="text"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <input
        type="date"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="venue"
        value={formData.venue}
        onChange={handleChange}
        placeholder="Venue"
        required
      />
      <input
        type="time"
        name="eventTime"
        value={formData.eventTime}
        onChange={handleChange}
        placeholder="Event Time"
        required
      />
      <select
        name="facultyMentorUsername"
        value={formData.facultyMentorUsername}
        onChange={handleChange}
        required
      >
        <option value="">Select Faculty</option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.fullname} ({user.username})
          </option>
        ))}
      </select>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
