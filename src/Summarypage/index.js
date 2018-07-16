import React, { Component } from "react";
import "./style.css";
import Gathering from "../Gathering";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "../MapContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Summarypage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      title: "",
      description: "",
      date: "",
      time: "",
      //can be any names
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    // console.log("mounted");
    let id = this.props.match.params.id;
    fetch(`/gatherings/${id}.json`)
      .then(response => response.json())
      .then(gathering => {
        this.setState({
          id: gathering.id,
          title: gathering.title,
          description: gathering.description,
          date: gathering.date,
          time: gathering.time,
          latitude: gathering.latitude,
          longitude: gathering.longitude
          //setting column names from database
        });
        console.log(gathering);
      });
  }

  onButtonClick(evt) {
    // evt.preventDefault();
    let id = this.props.match.params.id;
    console.log(id);

    fetch(`/gatherings/${id}.json`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => {
      this.setState({
        destroyed: true
      });
    });
  }

  render() {
return (
  <div className="Summarypage">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/gathering/create">Create</Link>
      </li>
      <li>
        <Link to="/gatherings">Gatherings</Link>
      </li>
    </ul>
    <div className="single-info-box">
      <Gathering
        id={this.state.id}
        title={this.state.title}
        description={this.state.description}
        date={this.state.date}
        time={this.state.time}
      />

      <div className="item-map">
        <MapContainer
          google={this.props.google}
          lat={this.state.latitude}
          lng={this.state.longitude}
        />
      </div>
      <div>
        <Link to={`/gatherings/${this.state.id}/edit`}>
          <button type="button" value="EDIT" placeholder="EDIT">
            Edit
          </button>
        </Link>

        <Link to={"/gatherings"}>
          <button type="button" onClick={this.onButtonClick}>
            Delete
          </button>
        </Link>

        <Link to={"/gatherings"}>
          <button type="button">
            All Gatherings
          </button>
        </Link>
      </div>
    </div>
  </div>
);
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDQPyly4b7F7qXCEJBwqd6IE1ukHbBOX9s"
})(Summarypage);
