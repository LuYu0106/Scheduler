import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { editTask } from "../../actions/personalActions";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        taskDDL: "",
        website: "",
        tag: "",
        description: "",
        estimatedHours: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  //   renderError = ({ error, touched }) => {
  //     if (error && touched) {
  //       return <div className="form-control-danger">{error}</div>;
  //     }
  //   };

  //   renderInput = ({ input, label, meta }) => {
  //     return (
  //       <div className="form-group ">
  //         <label className="col-4 col-form-label">{label}</label>
  //         <input className="form-control " {...input} />
  //         <div>{this.renderError(meta)}</div>
  //       </div>
  //     );
  //   };

  //   renderInput = ({ input, label, meta }) => {
  //     return (
  //       <div className="form-group ">
  //         <label className="col-4 col-form-label">{label}</label>
  //         <input className="form-control " {...input} />
  //         <div>{this.renderError(meta)}</div>
  //       </div>
  //     );
  //   };

  //   renderDropDown = ({ input, label, meta }) => {
  //     console.log(input);
  //     // return (

  //     //    <div>
  //     // {/* //     <select {...input}>
  //     // //       {/* <option value="">Select</option> */}
  //     // //       {input.choices.map(choice => (
  //     // //         <option key={choice} value={choice}>
  //     // //           {choice}
  //     // //         </option>
  //     // //       ))}
  //     // //     </select> */}
  //     //    </div>
  //     // );
  //   };

  //   onSubmit = formValues => {
  //     this.props.onSubmit(formValues);
  //   };

  //   handleChange(event) {
  //     this.setState({ value: event.target.value });
  //   }

  onChange(e) {
    let status = false;
    if (e.target.name === "completed") {
      if (e.target.value === "Done") status = true;
      this.setState({ [e.target.name]: status });
    } else this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let completeBy = "";
    if (this.props.env === "personal") {
      completeBy = "5c9986d89f6133cdec6b6b8a"; // get userId from tocken
    }

    const editedTask = {
      ...this.task,
      completed: false,
      createByUserId: "5c9986d89f6133cdec6b6b8a", //get userID from tocken
      completeByUserId: completeBy
    };
    this.props.editTask(editedTask);
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
            onChange={this.onChange}
          />
        </FormGroup>
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
            value="Seleted"
            onChange={this.onChange}
          >
            <option>Sport</option>
            <option>Food</option>
            <option>Online Learning</option>
          </Input>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      //   <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      //     <Field
      //       name="taskDDL"
      //       label="Task Deadline "
      //       component={this.renderInput}
      //     />
      //     <Field
      //       name="description"
      //       label="Task Description"
      //       component={this.renderInput}
      //     />
      //     <Field
      //       name="website"
      //       label="related website"
      //       component={this.renderInput}
      //     />
      //     <Field
      //       name="estimatedHours"
      //       label="Estimated Hours"
      //       component={this.renderInput}
      //     />

      //     <Field name="tag" label="Tag" component={this.renderInput} />
      //     {/* <Field
      //       name="tag"
      //       label="TagSelect"
      //       component={this.renderDropDown}
      //       choices={["hh", "dd"]}
      //       className="form-control"
      //     /> */}

      //     <button type="submit" className="btn btn-primary">
      //       Submit
      //     </button>
      //   </form>
    );
  }
}

const validate = formValues => {
  const error = {};
  if (!formValues.groupName) {
    error.groupName = "You must enter a Group name ";
  }
  if (!formValues.groupPassword) {
    error.groupPassword = "You must enter a Group password ";
  }
  if (!formValues.groupDescription) {
    error.groupDescription = "You must enter a description";
  }
  return error;
};

// export default connect(
//   {},
//   { editTask }
// )(TaskForm);
