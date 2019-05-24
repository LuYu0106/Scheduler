import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import EditCard from "./editCard";
import { editTask } from "../../actions/personalActions";

class RequestButton extends Component {
  constructor(props) {
    super(props);
    this.state = { task: {}, disabled: false };
    this.onRequest = this.onRequest.bind(this);
  }

  componentWillMount() {
    const currentTask = this.props.tasks.filter(
      task => task.id === this.props.taskId
    )[0];
    const checkStatus = currentTask.completeByUserId !== null ? true : false;
    this.setState({ task: { ...currentTask }, disabled: checkStatus });
  }

  onRequest(taskID) {
    const editedTask = {
      ...this.state.task
    }; // need to get this from url userid
    this.props.editTask(editedTask);
    this.setState({ disabled: true });
  }

  render() {
    return (
      <td>
        <Button
          color="primary"
          disabled={this.state.disabled}
          onClick={() => this.onRequest(this.props.taskID)}
        >
          Request This Task
        </Button>
      </td>
    );
  }
}

RequestButton.propTypes = {
  tasks: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  { editTask }
)(RequestButton);
