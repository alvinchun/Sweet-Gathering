import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

// INSERT INTO buildings VALUES (DEFAULT, 'Sagrada Familia', 2028, 'Barcelona', 'Antoni Gaudi', 'Art Nouveau', 'https://laninga.files.wordpress.com/2016/05/dscf4303.jpg');

class Gathering extends Component {

  render() {
    console.log(this.props);
    return <div className="gathering">
        <div className="gathering-details">
          <h3>
            <Link to={`/gatherings/${this.props.id}`}>
              <b>Title: {this.props.title}</b>
            </Link>
          </h3>
          <p>Description: {this.props.description}</p>
          <p>Date: {this.props.date}</p>
          <p>Time: {this.props.time}</p>
        </div>
      </div>;
  }
}

export default Gathering;

