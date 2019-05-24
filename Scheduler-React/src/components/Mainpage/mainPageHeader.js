import React, { Component } from "react";
import { Col, Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";

export default class MainPageHeader extends Component {
  render() {
    return (
      <div>
        <Col md={14}>
          <Jumbotron>
            <h1 className="display-3"> Welcome to Scheduler App</h1>
          </Jumbotron>
        </Col>
      </div>
    );
  }
}
