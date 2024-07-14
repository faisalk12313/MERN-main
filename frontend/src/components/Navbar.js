import React from "react";
import { Link } from 'react-router-dom';
import "./components.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/">
          <h1>NASCON Management System</h1>
        </Link>
        <div className="nav-buttons">
          <Link to="/Admin">
            <button className="nav-button">Admin</button>
          </Link>
          <Link to="/Faculty">
            <button className="nav-button">Faculty</button>
          </Link>
          <Link to="/Participant">
            <button className="nav-button">Participant</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;