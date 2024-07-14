import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Navbar from "../components/Navbar";

const Faculty = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const updateEventList = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error updating event list:", error);
    }
  };

  const handleDeleteEvent = async (eventName) => {
    try {
      const response = await fetch(`/api/events/${eventName}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      // Remove the deleted event from the state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.eventName !== eventName)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = async (updatedEventData) => {
    try {
      const response = await fetch(`/api/events/${updatedEventData.eventName}`, {
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
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventName === updatedEventData.eventName ? updatedEventData : event
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="Faculty">
      <Navbar />
      <br/>
      <h1>Hello, Faculty!</h1>
      <EventList events={events} handleDelete={handleDeleteEvent} handleUpdate={handleUpdateEvent} />
      <EventForm updateEventList={updateEventList} />
    </div>
  );
};

export default Faculty;
