import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import EditCard from "./editCard";

class EditButton extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, task: {} };
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  onEditSubmit() {
    this.setState(state => ({ collapse: !state.collapse }));
    console.log(this.props.taskStatus);
  }

  render() {
    return (
      <div>
        <Button
          disabled={
            this.props.tasks.filter(task => task.id === this.props.taskId)[0]
              .completed
          }
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Edit Task
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card style={{ border: "0" }}>
            <CardBody>
              <EditCard
                taskId={this.props.taskId}
                onEditSubmit={this.onEditSubmit}
              />
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  {}
)(EditButton);
