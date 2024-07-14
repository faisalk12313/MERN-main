import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import Navbar from "../components/Navbar";
import "./pages.css"; // Import the CSS file

const Home = () => {
  // const { workouts, dispatch } = useWorkoutsContext();

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch("/api/workouts");
  //     const json = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "SET_WORKOUTS", payload: json });
  //     }
  //   };

  //   fetchWorkouts();
  // }, [dispatch]);

  return (
    <div className="home">
      <Navbar />
      <br/>
      <div className="summary-container">
        <div className="summary-box">
          <h2>Summary</h2>
          <p>Our website aims for NASCON admin and faculty to have an easier time managing the event.</p>
        </div>
        <div className="contact-links">
          <h2>Contact Us</h2>
          <ul>
            <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
            <li><a href="https://www.twitter.com/">Twitter</a></li>
            <li><a href="https://www.facebook.com/">Facebook</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
