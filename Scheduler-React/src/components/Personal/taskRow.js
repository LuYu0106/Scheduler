import React, { Component } from "react";
import { connect } from "react-redux";
import DetailButton from "./detailButton";

import EditButton from "./editButton";
import RequestButton from "./requestButton";
import { Col, Jumbotron, Button } from "reactstrap";
import {
  fetchPrivateTasks,
  fetchAllGroupTasks,
  deleteTask,
  editTask
} from "../../actions/personalActions";

class TaskRow extends Component {
  constructor(props) {
    super(props);
    this.state = { task: {}, disabled: false };
    this.updateColor = this.updateColor.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  updateState(state) {
    const currentTask = this.props.tasks.filter(
      task => task.id === this.props.taskID
    )[0];

    const checkStatus = currentTask.completeByUserId !== "" ? true : false;
    return { task: { ...currentTask }, disabled: checkStatus };
  }

  componentWillMount() {
    this.setState(this.updateState);
  }

  updateColor(completed) {
    if (completed) return "success";
    else return "warning";
  }

  onEdit() {
    this.setState(this.updateState);
  }

  render() {
    return (
      <tr key={this.state.task.id}>
        <td>{this.state.task.tag}</td>
        <td>
          <DetailButton taskDetails={this.state.task.description} />
        </td>
        <td>
          <Button color={this.updateColor(this.state.task.completed)}>
            {this.state.task.completed ? "Done" : "In Progress"}
          </Button>
        </td>
        <td>
          <EditButton taskId={this.state.task.id} onEdit={this.onEdit}>
            Edit
          </EditButton>
        </td>
        <td>
          <Button
            color="danger"
            onClick={() => this.onDelete(this.state.task.id)}
          >
            Delete
          </Button>
        </td>
        <RequestButton taskId={this.state.task.id} />
      </tr>
    );
  }
}

// TaskRow.propTypes = {
//   tasks: PropTypes.array.isRequired
// };

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  { editTask }
)(TaskRow);
