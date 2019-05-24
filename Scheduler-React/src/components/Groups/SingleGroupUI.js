import React, { Component } from "react";
import { Col, Jumbotron } from "reactstrap";
import TasksTable from "../Personal/allTasks";
import TaskForm from "../Personal/taskForm";
import TaskStatusBarChart from "../Personal/taskStatusBarChart";
import PersonalWelcomePage from "../Personal/personalWelcomePage";
import Header from "../Layout/Header";

import { Container } from "reactstrap";

export default class SingleGroupUI extends Component {
  constructor(props) {
    super(props);
    this.state = { hideForm: true };
    console.log("what is the prpos? Lu2 " + this.props.match.params.id);
  }

  onclickToHide = () => {
    const res = this.state.hideForm ? false : true;
    this.setState({ hideForm: res });
  };

  //confirm with yanqun
  /*
  componentDidMount() {
    this.props.fetchAllGroupTasks(this.props.match.params.id); 
  }
  */

  render() {
    return (
      <div>
        <Container>
          <Header />

          <PersonalWelcomePage onclickToHide={this.onclickToHide} />

          {this.state.hideForm ? (
            <div />
          ) : (
            <Col md={12}>
              <Jumbotron>
                <TaskForm
                  groupID={this.props.match.params.id}
                  env="group"
                  onclickToHide={this.onclickToHide}
                />
              </Jumbotron>
            </Col>
          )}

          <TasksTable groupID={this.props.match.params.id} env="group" />
          <br />
          <br />
          <TaskStatusBarChart
            groupID={this.props.match.params.id}
            env="group"
          />
        </Container>
      </div>
    );
  }
}
