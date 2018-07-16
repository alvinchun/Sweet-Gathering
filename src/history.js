import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "../MapContainer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Items from "../Items";
import UpdateItem from "../UpdateItem";
import Item from "../Item";

import "./style.css";

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      user_name_id: "",
      category_id: "",
      name: "",
      description: "",
      price: "",
      condition: "",
      quantity: "",
      img_url: "",
      userEmail: "",
      userPhone: "",
      userLongitude: "",
      userLatitude: "",
      deleted: false
    };
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }

  componentDidMount() {
    this.itemPageFetch();
  }

  itemPageFetch() {
    console.log("item page fetch");
    let id = this.props.match.params.id;
    fetch(`/items/${id}.json`)
      .then(response => response.json())
      .then(item => {
        console.log(item);
        this.setState({
          user_name_id: item.user.username,
          category_id: item.category.name,
          name: item.item.name,
          description: item.item.description,
          price: item.item.price,
          condition: item.item.condition,
          quantity: item.item.quantity,
          img_url: item.item.img_url,
          userEmail: item.user.email,
          userPhone: item.user.phone_number,
          userLongitude: item.user.longitude,
          userLatitude: item.user.latitude,
          userFirstName: item.user.first_name,
          userLastName: item.user.last,
          deleted: this.state.deleted
        });
      });
  }

  deleteOnClick(evt) {
    evt.preventDefault();
    const item = this.state;
    let id = this.props.match.params.id;
    fetch(`/items/delete/${id}.json`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(item => {
        console.log("deleted");
        this.setState({
          deleted: true
        });
      });
  }

  render() {
    let id = this.props.match.params.id;
    console.log(id);
    if (this.state.deleted === true) {
      console.log(this.state);
      return <Redirect to={"/items"} />;
    }
    return (
      <div className="ItemsPage">
        <div className="Item">
          <Item
            user_name_id={this.state.user_name_id}
            category_id={this.state.category_id}
            name={this.state.name}
            description={this.state.description}
            price={this.state.price}
            condition={this.state.condition}
            quantity={this.state.quantity}
            img_url={this.state.img_url}
          />
          <p>{this.state.description}</p>
          <p>Condition: {this.state.condition}</p>
          <p>Quantity: {this.state.quantity}</p>
          <p>
            <img
              src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-4/128/User-blue-icon.png"
              className="icon"
              alt="user icon"
            />: {this.state.user_name_id}
          </p>
          <p>
            <img
              src="http://icons.iconarchive.com/icons/wwalczyszyn/android-style-honeycomb/256/Mail-icon.png"
              className="icon"
              alt="mail icon"
            />: {this.state.userEmail}
          </p>
          <p>
            <img
              src="http://icons.iconarchive.com/icons/wwalczyszyn/android-style-honeycomb/128/Phone-icon.png"
              className="icon"
              alt="phone icon"
            />: {this.state.userPhone}
          </p>
          <div className="update-delete">
            <Link to={`/item/update/${id}`}>
              <img
                src="http://icons.iconarchive.com/icons/iconsmind/outline/256/File-Edit-icon.png"
                className="update-icon"
                alt="update item"
              />
            </Link>
            {/* <Router>
            <div>
            <Route path="/item/update/:id" exact component={UpdateItem} />
            </div>
          </Router> */}
            <form onClick={this.deleteOnClick}>
              <button>
                <img
                  src="http://icons.iconarchive.com/icons/iconsmind/outline/256/Delete-File-icon.png"
                  className="delete-icon"
                  alt="delete"
                />
              </button>
            </form>
          </div>
        </div>
        <div className="item-map">
          <MapContainer
            google={this.props.google}
            lat={this.state.userLatitude}
            lng={this.state.userLongitude}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCeTdCRweKINV2rVaMeM8LSSFMewLhUAXI"
})(ItemsPage);
