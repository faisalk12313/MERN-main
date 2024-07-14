import React, { useState } from "react";
import "./components.css";


const EventList = ({ events, handleDelete, handleUpdate }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState(null);

  const handleFieldSelection = (field) => {
    setSelectedField(field);
  };

  const handleUpdateEvent = async () => {
    try {
      // Perform update based on selectedField and new value
      const updatedEventData = { ...selectedEvent, [selectedField]: newValue };
      const response = await fetch(`/api/events/${selectedEvent.eventName}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEventData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      // Update the event in the state
      handleUpdate(updatedEventData);

      // Close the popup and clear state
      setSelectedEvent(null);
      setSelectedField("");
      setNewValue("");
      setError(null);
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event. Please try again later.");
    }
  };

  const renderInputField = () => {
    if (selectedField === "eventDate") {
      return (
        <input
          type="date"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="New Date"
        />
      );
    } else if (selectedField === "eventTime") {
      return (
        <input
          type="time"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="New Time"
        />
      );
    } else {
      return (
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={`New ${selectedField}`}
        />
      );
    }
  };

  return (
    <div className="event-list">
      <h2>Events:</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {events.map((event) => (
          <div className="workout-details" key={event.eventName}>
            <h4>{event.eventName}</h4>
            <p>
              <strong>Date: </strong>
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time: </strong>
              {event.eventTime}
            </p>
            <p>
              <strong>Venue: </strong>
              {event.venue}
            </p>
            <p>
              <strong>Faculty Mentor: </strong>
              {event.facultyMentorUsername}
            </p>
            <button className="material-symbols-outlined" onClick={() => handleDelete(event.eventName)}>
              Delete
            </button>
            <button className="material-symbols-outlined" onClick={() => setSelectedEvent(event)}>
              Update
            </button>
          </div>
        ))}
      </ul>

      {selectedEvent && (
        <div className="popup">
          <h3>Select Field to Update:</h3>
          <button onClick={() => handleFieldSelection("eventName")}>Event Name</button>
          <button onClick={() => handleFieldSelection("eventDate")}>Event Date</button>
          <button onClick={() => handleFieldSelection("eventTime")}>Event Time</button>
          <button onClick={() => handleFieldSelection("venue")}>Venue</button>
          {/* Add more buttons for other fields */}
          {selectedField && (
            <div>
              {renderInputField()}
              <button onClick={handleUpdateEvent}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
