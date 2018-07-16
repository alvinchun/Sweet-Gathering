import React, { Component } from "react";
import Gathering from "../Gathering";
import "./style.css";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "../MapContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Allgatherings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gatherings: []
    };
  }

  componentDidMount() {
    fetch("/gatherings.json")
      .then(response => response.json())
      .then(gatherings => {
        this.setState({
          gatherings: gatherings
        });
      });
  }

  render() {
    return (
      <div className="Allgatherings">
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
        <h1>All Gatherings</h1>
        {this.state.gatherings.map(gathering => {
          return (
            <div className="all-info-box">
              <Link to={`/gatherings/${gathering.id}`}>
                <Gathering
                  key={gathering.id}
                  id={gathering.id}
                  title={gathering.title}
                  description={gathering.description}
                  date={gathering.date}
                  time={gathering.time}
                  latitude={gathering.latitude}
                  longitude={gathering.longitude}
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Allgatherings;
