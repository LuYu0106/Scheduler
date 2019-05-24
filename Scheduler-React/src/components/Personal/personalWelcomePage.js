import React, { Component } from "react";
import { Col, Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class PersonalWelcomePage extends Component {
  render() {
    return (
      <div>
        <Col md={12}>
          <Jumbotron>
            {this.props.env === "group" ? (
              <div>
                <h1 className="display-3">Welcome to your group page!</h1>
                <br />
                <p className="lead">
                  Develop a host of skills that are increasingly important in
                  the professional world
                </p>
                <p className="lead">Break complex tasks into parts and steps</p>
                <p className="lead">Plan and manage time</p>
                <p className="lead">
                  Tackle more complex problems than they could on their own
                </p>
                <hr className="my-2" />

                <br />
              </div>
            ) : (
              <div>
                <h2 className="display-3">Welcome to Your Task Tank!</h2>
                <br />
                <p className="lead">
                  List your tasks here and do it right away!
                </p>
                <p className="lead">Check how your plans are going on!</p>

                <hr className="my-2" />

                <br />
              </div>
            )}

            <div className="row">
              <div className="col-sm-3">
                <Button
                  color="primary"
                  onClick={this.props.onclickToHide}
                  style={{ marginBottom: "1rem" }}
                >
                  Create a New Task
                </Button>
              </div>
              {this.props.env === "personal" ? (
                <div className="col-sm-3" />
              ) : (
                <div />
              )}
            </div>
          </Jumbotron>
        </Col>
      </div>
    );
  }
}
