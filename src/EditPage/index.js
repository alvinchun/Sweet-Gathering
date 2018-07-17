import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      description: "",
      date: "",
      time: "",
      latitude: "",
      longitude: "",
      updated: false,
      redirectToNewPage: false
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    // console.log(id)
    fetch(`/gatherings/${id}.json`)
      .then(response => response.json())
      .then(gathering => {
        this.setState({
          id: gathering.id,
          title:gathering.title,
          description: gathering.description,
          date: gathering.date,
          time: gathering.time,
          latitude: gathering.latitude,
          longitude: gathering.longitude,
        });
      });
  }

  //Allows the form to change when the user types in it
  onFormChange(evt) {
    const element = evt.target;
    const name = element.name;
    const value = element.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  //Handles the form when it is submitted and grabs the trip id for the redirect to single view page
  onFormSubmit(evt) {
    evt.preventDefault();
    const updateGathering = {
      // ...this.state
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }
    console.log(updateGathering);
    fetch(`/gatherings/${updateGathering.id}.json`, {
      method: "PUT",
      body: JSON.stringify(updateGathering),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(gathering => {
        console.log(gathering);
        this.setState({
          updated: true,
          redirectToNewPage: true
        })
      })
  }

  //Grabs all the cities for the dropdown cities list

  render() {
    console.log(this.state.updated)
    if (this.state.redirectToNewPage === true) {
      let id = this.state.id;
      return <Redirect to={`/gatherings/${id}`} />;
    }
    return <div className="EditGathering">
        <h1>Edit Gathering</h1>
        <div className="edit-info-form">
          <form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
            <p>
              <label for="title">Title: </label>
              <input type="text" name="title" placeholder="Title" value={this.state.title} />
            </p>
            <p>
              <label for="description">Descriptioin: </label>
              <input type="text" name="description" placeholder="Descriptioin of the event" value={this.state.description} />
            </p>
            <p>
              <label for="date">Date: </label>
              <input type="date" name="date" placeholder="date" value={this.state.date} />
            </p>
            <p>
              <label for="time">Time: </label>
              <input type="time" name="time" placeholder="time" value={this.state.time} />
            </p>
            <p>
              <label for="latitude">Latitude: </label>
              <input type="text" name="latitude" placeholder="Latitude" value={this.state.latitude} />
            </p>
            <p>
              <label for="city">Longitude: </label>
              <input type="text" name="longitude" placeholder="Longitude" value={this.state.longitude} />
            </p>
            <div className="edit-page-buttons">
            <Link to={`/gatherings/${this.state.id}`}>
              <p>
                <input id="update" type="submit" value="Previous" />
              </p>
            </Link>
            <p>
              <input id="update" type="submit" value="Update" />
            </p>
            </div>
          </form>
        </div>
      </div>;
  }
}


export default EditPage;
