import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "reactstrap";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import NavApp from "./navApp";

export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <NavApp />
        </Container>
      </div>
    );
  }
}
