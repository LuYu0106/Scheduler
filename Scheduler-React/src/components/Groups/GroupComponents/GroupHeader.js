import React, { Component } from "react";
import { Col, Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";

export default class GroupHeader extends Component {
  render() {
    return (
      <div>
        <Col md={12}>
          <Jumbotron>
            <h1 className="display-3">Welcome to the Group!</h1>
            <br />
            <p className="lead">
              Develop a host of skills that are increasingly important in the
              professional world
            </p>
            <p className="lead">Break complex tasks into parts and steps</p>
            <p className="lead">Plan and manage time</p>
            <p className="lead">
              Tackle more complex problems than they could on their own
            </p>
            <hr className="my-2" />

            <br />
            <div className="row">
              <div className="col-sm-3">
                <Link
                  className="btn btn-primary"
                  to="/groups/new"
                  color="primary"
                >
                  Create a New Group
                </Link>
              </div>
              <div className="col-sm-3">
                <Link
                  className="btn btn-primary"
                  to="/groups/join"
                  color="primary"
                >
                  Join a New Group
                </Link>
              </div>
            </div>
          </Jumbotron>
        </Col>
      </div>
    );
  }
}
