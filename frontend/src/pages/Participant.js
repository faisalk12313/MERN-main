import React, { useState, useEffect } from "react";
import "./eventdetail.css"; 
import Navbar from "../components/Navbar";

const EventListParticipant = ({ username }) => {
    // State variable to store the list of events
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      // Fetch events when the component mounts
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
  
    // Function to handle applying to an event
    const handleApplyToEvent = async (eventName, eventId) => {
      try {
        // Check if the user is already registered for the event
        const response = await fetch(`/api/tickets/${username}/${eventName}`);
        if (response.ok) {
          console.log(`You are already registered for event: ${eventName}`);
          return;
        }
        let userName = username;
        // If not already registered, create a new ticket
        const createTicketResponse = await fetch('/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, eventName }),
        });
  
        if (createTicketResponse.ok) {
          console.log(`Applied to event: ${eventName} by ${username}`);
        } else {
          throw new Error('Failed to apply to the event');
        }
      } catch (error) {
        console.error("Error applying to event:", error);
      }
    };
  
    return (
      <div className="event-list">
        <h2>Events:</h2>
        <ul>
          {events.map((event) => (
            <div className="event-details workout-details" key={event._id}>
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
              <button onClick={() => handleApplyToEvent(event.eventName, event._id)}>Apply</button>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  

const ParticipantForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
    email: "",
    phone: "",
    cnic: "",
    foodDeal: 1 // Default value for food deal
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to create a new user
      const userResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          fullname: formData.fullname,
          password: formData.password,
          email: formData.email,
          phone: formData.phone,
          userRole: 3 // Assuming 3 is the participant role
        })
      });
      
      if (!userResponse.ok) {
        throw new Error("Failed to create user");
      }
  
      // Make a POST request to create a new participant
      const participantResponse = await fetch("/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          cnic: formData.cnic,
          foodDeal: formData.foodDeal
        })
      });
  
      if (!participantResponse.ok) {
        throw new Error("Failed to create participant");
      }
  
      // Reset the form after successful submission
      setFormData({
        username: "",
        fullname: "",
        password: "",
        email: "",
        phone: "",
        cnic: "",
        foodDeal: 1
      });
  
      // Call the onFormSubmit function passed from the parent component
      // Pass the username to the function
      onFormSubmit(formData.username);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Participant</h3>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        name="cnic"
        value={formData.cnic}
        onChange={handleChange}
        placeholder="CNIC"
        required
      />
      <select name="foodDeal" value={formData.foodDeal} onChange={handleChange}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      <br></br>
      <br></br>
      <button type="submit">Add Participant</button>
    </form>
  );
};

const Participant = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [username, setUsername] = useState("");

    const handleFormSubmit = (username) => {
      setUsername(username);
      setFormSubmitted(true);
    };
  
    return (
      <div className="Participant">
        <Navbar />
        <div className="dummy"></div>
        <h1>Hello, Participant</h1>
        {!formSubmitted && <ParticipantForm onFormSubmit={handleFormSubmit} />}
        {formSubmitted && <EventListParticipant username={username} />}
      </div>
    );
  };
  

export default Participant;
