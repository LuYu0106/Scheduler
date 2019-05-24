import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { editTask } from "../../actions/personalActions";

class EditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const currentTask = this.props.tasks.filter(
      task => task.id === this.props.taskId
    )[0];
    this.setState({ ...currentTask });
  }
  onChange(e) {
    let status = false;
    if (e.target.name === "completed") {
      if (e.target.value === "Done") status = true;
      this.setState({ [e.target.name]: status });
    } else this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const editedTask = { ...this.state };
    console.log(editedTask);
    this.props.editTask(editedTask);
    this.props.onEditSubmit();
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="deadline">Deadline</Label>
          <Input
            type="text"
            name="taskDDL"
            id="taskDDL"
            value={this.state.taskDDL}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="website">website</Label>
          <Input
            type="text"
            name="website"
            id="website"
            value={this.state.website}
            onChange={this.onChange}
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
            onChange={this.onChange}
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
        <FormGroup>
          <Label for="exampleSelect">Status</Label>
          <Input
            type="select"
            name="completed"
            id="completed"
            value={this.state.completed ? "Done" : "In Progress"}
            onChange={this.onChange}
          >
            <option>In Progress</option>
            <option>Done</option>
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

EditCard.propTypes = {
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
)(EditCard);
