import React, { Component } from "react";
import { Col, Jumbotron } from "reactstrap";
import TasksTable from "./Personal/allTasks";
import TaskForm from "./Personal/taskForm";
import TaskStatusBarChart from "./Personal/taskStatusBarChart";
import PersonalWelcomePage from "./Personal/personalWelcomePage";
import Header from "./Layout/Header";
import { Container } from "reactstrap";

export default class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = { hideForm: true };
  }

  onclickToHide = () => {
    const res = this.state.hideForm ? false : true;
    this.setState({ hideForm: res });
  };

  render() {
    return (
      <div>
        <Container>
          <Header />
          <PersonalWelcomePage
            env="personal"
            onclickToHide={this.onclickToHide}
          />

          {this.state.hideForm ? (
            <div />
          ) : (
            <Col md={12}>
              <Jumbotron>
                <TaskForm env="personal" onclickToHide={this.onclickToHide} />
              </Jumbotron>
            </Col>
          )}

          <TasksTable env="personal" />
          <br />
          <br />
          <TaskStatusBarChart env="personal" />
        </Container>
      </div>
    );
  }
}
