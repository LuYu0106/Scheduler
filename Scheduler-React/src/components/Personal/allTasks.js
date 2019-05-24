import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import DetailButton from "./detailButton";

import EditButton from "./editButton";
import RequestButton from "./requestButton";
import { Button } from "reactstrap";
import {
  fetchAllGroupTasks,
  deleteTask,
  editTask,
  getGroupChartData,
  getUserChartData,
  fetchPrivateTasks,
  fetchUsersTasksInGroup
} from "../../actions/personalActions";

class TasksTable extends React.Component {
  constructor(props) {
    super(props);
    this.updateColor = this.updateColor.bind(this);
  }

  componentWillMount() {
    if (this.props.env === "group") {
      this.props.fetchAllGroupTasks(this.props.groupID); //give  groupId
    } else {
      this.props.fetchPrivateTasks(this.props.user.id); //give userID
    }
  }

  updateColor(completed) {
    if (completed) return "success";
    else return "warning";
  }

  onDelete = taskID => {
    this.props.deleteTask(taskID);
  };

  render() {
    return (
      <div>
        {this.props.env === "group" ? (
          <h2>Here are all the tasks in this group</h2>
        ) : (
          <div />
        )}
        <Table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Details</th>
              {this.props.env !== "group" ? <th>Status</th> : <th />}
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map(task => (
              <tr key={task.id}>
                <td>{task.description}</td>
                <td>
                  <DetailButton
                    taskDetails={
                      "You must finish this task before " +
                      task.taskDDL +
                      ". This task is about " +
                      task.tag +
                      "."
                    }
                  />
                </td>
                {this.props.env === "personal" ? (
                  <React.Fragment>
                    <td>
                      <Button color={this.updateColor(task.completed)}>
                        {task.completed ? "Done" : "In Progress"}
                      </Button>
                    </td>
                    <td>
                      <EditButton taskId={task.id} taskStatus={task.completed}>
                        Edit
                      </EditButton>
                    </td>
                    <td>
                      <Button
                        disabled={task.completed}
                        color="danger"
                        onClick={() => this.onDelete(task.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </React.Fragment>
                ) : (
                  <td />
                )}

                {this.props.env === "group" ? (
                  <RequestButton taskId={task.id} />
                ) : (
                  <td />
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {this.props.env === "group" ? (
          <div>
            <h2>Here are your tasks</h2>
            <Table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tasks
                  .filter(
                    ({ completeByUserId }) =>
                      completeByUserId === this.props.user.id //give userID
                  )
                  .map(task => (
                    <tr key={task.id}>
                      <td>{task.description}</td>
                      <td>
                        <DetailButton
                          taskDetails={
                            "You must finish this task before " +
                            task.taskDDL +
                            ". This task is about " +
                            task.tag +
                            "."
                          }
                        />
                      </td>
                      <td>
                        <Button color={this.updateColor(task.completed)}>
                          {task.completed ? "Done" : "In Progress"}
                        </Button>
                      </td>
                      <td>
                        <EditButton taskId={task.id}>Edit</EditButton>
                      </td>
                      <td>
                        <Button
                          disabled={task.completed}
                          color="danger"
                          onClick={() => this.onDelete(task.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.tasks.user,
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllGroupTasks,
    deleteTask,
    editTask,
    getGroupChartData,
    getUserChartData,
    fetchPrivateTasks,
    fetchUsersTasksInGroup
  }
)(TasksTable);
