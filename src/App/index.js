import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import Homepage from "../Homepage";
import CreateGatheringPage from "../CreateGatheringPage";
import Summarypage from "../Summarypage";
import Allgatherings from "../Allgatherings";
import EditPage from "../EditPage";


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return <Router>
        <div className="App">
          <Route path="/" exact component={Homepage} />
          <Route path="/gatherings" exact component={Allgatherings} />
          <Route path="/gatherings/:id" exact component={Summarypage} />
          <Route path="/gathering/create" exact component={CreateGatheringPage} />
          <Route path="/gatherings/:id/edit" exact component={EditPage} />
        </div>
      </Router>;
  }
}

export default App;
