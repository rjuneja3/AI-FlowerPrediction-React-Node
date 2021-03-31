import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import FormDataResults from "./Components/FormDataResults";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";

function App() {

  return (
    <Router>
      <div class="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
            Dinara Sharipova and Rohan Juneja: Lab 4
            </Link>
          </div>
        </nav>
            <Switch>
              <Route path="/" render={() => <FormDataResults />} />
            </Switch>
          </div>
    </Router>
  );
}

export default App;
