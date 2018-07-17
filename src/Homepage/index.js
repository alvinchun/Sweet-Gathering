import React, { Component } from "react";
import "./style.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Homepage extends Component {
  render() {
    return <div className="Homepage">
        <div className="main-wrapper">
          <h1 className="main-title">Sweet Gathering 😎</h1>
        </div>
      </div>;
  }
}

export default Homepage;
