import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import FlowerForm from "./Components/FlowerForm";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";

function App() {

  //runs once after the first rendering of page
  // useEffect(() => {
  //   const fetchData = async () => {
  //     axios
  //       .get(apiUrl)
  //       .then((result) => {
  //         console.log("result.data:", result.data);
  //         setData(result.data);
  //         setShowLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log("error in fetchData:", error);
  //       });
  //   };
  //   fetchData();
  // }, []);

  return (
    <Router>
      <div class="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              Assignment 4
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ">
                {/* <li className="nav-item">
                  <Link className="nav-link" to={"/"}>
                    FlowerForm
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>


            <Switch>
              <Route path="/" render={() => <FlowerForm />} />
            </Switch>
          </div>
    </Router>
  );
}

export default App;
