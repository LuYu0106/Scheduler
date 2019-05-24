import React, { Component } from "react";
import { Col, Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Header from "./Layout/Header";

var buttonSpace = {
  marginLeft: 30
};

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Col md={12}>
          <Jumbotron>
            <h1 className="display-3">Welcome: Yanqun</h1>
            <br />
            <p className="lead">
              You wanna add new personal task? Edit your task? view your
              personal progress?
            </p>
            <p className="lead">
              Everything about your Personal Page, go from here...
            </p>
            <p className="lead">
              <Link to={"/personal"}>
                <Button color="primary">View personal Page</Button>
              </Link>
            </p>
            <p className="lead">
              You wanna join new group? create new group? view your group?
            </p>
            <p className="lead">Everything about GROUP, go from here...</p>
            <p className="lead">
              <Link to={"/group"}>
                <Button color="primary">View Group Page</Button>
              </Link>
            </p>
            <hr className="my-2" />
          </Jumbotron>
        </Col>
      </div>
    );
  }
}
