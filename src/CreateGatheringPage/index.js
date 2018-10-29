import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapWithASearchBox from "../GoogleMaps"

class CreateGatheringPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      date: "",
      time: "",
      address:"",
      created: false,
      redirectToNewPage: false //??
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(evt) {
    const element = evt.target;
    const name = element.name; //"title"
    const value = element.value; //"g"
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    const newGathering = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    try {
      fetch("/gatherings/create.json", {
        method: "POST",
        body: JSON.stringify(newGathering),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(gathering => {
          this.setState({
            created: true, //Redirect to new page reset to true so code know the form submit has run
            redirectToNewPage: true, //??
            id: gathering.id
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    //
    if (this.state.redirectToNewPage === true) {
      let id = this.state.id;
      return <Redirect to={`/gatherings/${id}`} />;
    }
    return <div className="Createpage">
        <h1>Create New Gathering</h1>
        <form className="create-info-form" onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
          <p>
            <label for="title">Title: </label>
            <input type="text" name="title" placeholder="Title" value={this.state.title} />
          </p>
          <p>
            <label for="description">Descriptioin: </label>
            <input className="description-input" type="text" name="description" placeholder="Descriptioin of the event" value={this.state.description} />
          </p>
          <p>
            <label for="date">Date: </label>
            <input type="date" name="date" placeholder="date" value={this.state.date} />
          </p>
          <p>
            <label for="time">Time: </label>
            <input type="time" name="time" placeholder="time" value={this.state.time} />
          </p>
          <MapWithASearchBox />
          {/* <p>
            <label for="latitude">Address: </label>
            <input type="text" name="address" placeholder="Place the address" value={this.state.address} />
          </p> */}
          <p>
            <input className="create-button" type="submit" value="Create" />
          </p>
        </form>
      </div>;
  }
}

export default CreateGatheringPage;
