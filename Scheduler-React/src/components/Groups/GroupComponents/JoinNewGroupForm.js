import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class JoinNewGroupForm extends Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return <div className="form-control-danger">{error}</div>;
    }
  };

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="form-group ">
        <label className="col-4 col-form-label">{label}</label>
        <input className="form-control " {...input} />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="groupName"
          label="Group name "
          component={this.renderInput}
        />
        <Field
          name="groupPassword"
          label="Group password"
          component={this.renderInput}
        />
        <button type="submit" className="btn btn-primary">
          Join a New Group
        </button>
      </form>
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
  return error;
};

export default reduxForm({
  form: "GroupJoinForm",
  validate
})(JoinNewGroupForm);
