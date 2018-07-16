import React, { Component } from "react";
import { Map } from "google-maps-react";
import ReactDOM from "react-dom";
import Gathering from "../Gathering";

import "./style.css";

class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  componentDidUpdate() {
    this.loadMap();
  }

  loadMap() {
    console.log(this.props);

    if (this.props && this.props.google) {
      // const lat = this.props.latitude;
      // const lng = this.props.longitude;
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 15;
      let lat = this.props.lat;
      let lng = this.props.lng;

      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    const style = {
      width: "40rem",
      height: "30rem"
    };

    return (
      <div ref="map" style={style} class="map" className="test">
        <Map google={this.props.google.div} />
      </div>
    );
  }
}

export default Marker;
