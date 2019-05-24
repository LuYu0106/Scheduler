import React, { Component } from "react";
import { Col, Jumbotron, Button } from "reactstrap";

export default class SingleGroupTask extends Component {
  render() {
    return (
      <div>
        <Col md={12}>
          <Jumbotron>
            <h1 className="display-3">Welcome !</h1>
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
                <Button
                  color="primary"
                  onClick={this.props.onclickToHide}
                  style={{ marginBottom: "1rem" }}
                >
                  Create a New Task
                </Button>
              </div>
            </div>
          </Jumbotron>
        </Col>
      </div>
    );
  }
}
