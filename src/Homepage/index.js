import React, { Component } from "react";
import "./style.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Homepage extends Component {
  render() {
    return (
      <div className="Homepage">
      <div className="Navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li> <Link to="/gathering/create">Create</Link></li>
          <li> <Link to="/gatherings">Gatherings</Link></li>
        </ul>
      </div>
        <div className="main-wrapper">
          <h1>Sweet Gathering</h1>
          <h2></h2>
        </div>
      </div>
    );
  }
}

export default Homepage;
