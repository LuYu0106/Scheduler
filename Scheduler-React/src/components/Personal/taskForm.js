import React, { Component } from "react";
import { connect } from "react-redux";

import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { createTask } from "../../actions/personalActions";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        taskDDL: "",
        website: "",
        tag: "cs6035",
        description: "",
        estimatedHours: ""
      },
      error: {
        taskDDL: "",
        description: "",
        estimatedHours: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  onChange(field, e) {
    let task = this.state.task;
    task[field] = e.target.value;
    this.setState({ task });
  }

  checkDDL(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  handleValidation() {
    let task = this.state.task;

    let error = {};
    let formIsValid = true;
    if (!this.checkDDL(task["taskDDL"])) {
      formIsValid = false;
      error["taskDDL"] = "Cannot be empty and Must be MM/DD/YYYY";
    }
    if (!task["description"]) {
      formIsValid = false;
      error["description"] = "Cannot be empty";
    }
    if (!task["estimatedHours"] || isNaN(Number(task["estimatedHours"]))) {
      formIsValid = false;
      error["estimatedHours"] = "Must be a number and Cannot be empty";
    }
    this.setState({ error: error });
    return formIsValid;
  }

  onSubmit(e) {
    e.preventDefault();
    const res = this.handleValidation();
    if (!res) {
      return;
    }
    // console.log("here is logged in by :");
    // console.log(this.props.user);
    if (this.props.env === "personal") {
      const newTask = {
        ...this.state.task,
        completed: false,
        // createByUserId: "5c9986d89f6133cdec6b6b8a", //get userID from tocken
        // completeByUserId: "5c9986d89f6133cdec6b6b8a",
        isInGroup: -1
      };
      this.props.createTask(newTask);
    } else {
      const newTask = {
        ...this.state.task,
        completed: false,
        // createByUserId: "5c9986d89f6133cdec6b6b8a", //get userID from tocken
        isInGroup: this.props.groupID //get groupID from tocken
      };
      this.props.createTask(newTask);
    }

    this.props.onclickToHide();
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="deadline">Task Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            onChange={this.onChange.bind(this, "description")}
          />
          {this.state.error.description !== "" ? (
            <span style={{ color: "red" }}>{this.state.error.description}</span>
          ) : (
            <div />
          )}
        </FormGroup>
        <FormGroup>
          <Label for="deadline">Deadline</Label>
          <Input
            type="text"
            name="taskDDL"
            id="taskDDL"
            placeholder="MM/DD/YYYY"
            value={this.state.taskDDL}
            onChange={this.onChange.bind(this, "taskDDL")}
          />
          {this.state.error.taskDDL !== "" ? (
            <span style={{ color: "red" }}>{this.state.error.taskDDL}</span>
          ) : (
            <div />
          )}
        </FormGroup>
        <FormGroup>
          <Label for="deadline">Estimated Hours</Label>
          <Input
            type="text"
            name="estimatedHours"
            id="estimatedHours"
            value={this.state.estimatedHours}
            onChange={this.onChange.bind(this, "estimatedHours")}
          />
          {this.state.error.estimatedHours !== "" ? (
            <span style={{ color: "red" }}>
              {this.state.error.estimatedHours}
            </span>
          ) : (
            <div />
          )}
        </FormGroup>
        <FormGroup>
          <Label for="website">website</Label>
          <Input
            type="text"
            name="website"
            id="website"
            value={this.state.website}
            onChange={this.onChange.bind(this, "website")}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect" sm={2}>
            Tag
          </Label>
          <Input
            type="select"
            name="tag"
            id="tag"
            sm={10}
            value={this.state.tag}
            onChange={this.onChange.bind(this, "tag")}
          >
            <option>cs6035</option>
            <option>cs6200</option>
            <option>cs6300</option>
            <option>cs6310</option>
            <option>cs6400</option>
            <option>cs6440</option>
            <option>cs6460</option>
            <option>cs6515</option>
            <option>cs6750</option>
            <option>cs7637</option>
            <option>cs7641</option>
            <option>cs7646</option>
          </Input>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default connect(
  null,
  { createTask }
)(TaskForm);
