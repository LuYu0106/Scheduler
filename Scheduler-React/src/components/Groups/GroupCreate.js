import React, { Component } from "react";
import { createGroup } from "../../actions";
import { connect } from "react-redux";
import JumbotronCreateG from "./GroupComponents/JumbotroncCreateG";
import { Container } from "reactstrap";
import Header from "../Layout/Header";
import classnames from "classnames";
import PropTypes from "prop-types";

class GroupCreate extends Component {
  constructor() {
    super();

    this.state = {
      groupName: "",
      groupPassword: "",
      groupPic: "",
      groupDescription: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = event => {
    event.preventDefault();

    const newGroup = {
      groupName: this.state.groupName,
      groupPassword: this.state.groupPassword,
      groupPic: this.state.groupPic,
      groupDescription: this.state.groupDescription
    };

    this.props.createGroup(newGroup);
  };

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Header />
        <JumbotronCreateG />
        <div>
          <form onSubmit={this.onSubmit} autoComplete="off">
            <div className="form-group ">
              <label>Group name</label>
              <input
                autoComplete="true"
                className={classnames("form-control form-control-md", {
                  "is-invalid": errors.groupName
                })}
                type="text"
                name="groupName"
                value={this.state.groupName}
                onChange={this.onChange}
              />
              {errors.groupName && (
                <div className="alert alert-danger" role="alert">
                  {errors.groupName}
                </div>
              )}
            </div>

            <div className="form-group ">
              <label>Group password</label>
              <input
                autoComplete="false"
                className={classnames("form-control form-control-md", {
                  "is-invalid": errors.groupPassword
                })}
                type="password"
                name="groupPassword"
                value={this.state.groupPassword}
                onChange={this.onChange}
              />
              {errors.groupPassword && (
                <div className="alert alert-danger" role="alert">
                  {errors.groupPassword}
                </div>
              )}
            </div>

            <div className="form-group ">
              <label>Group picture</label>
              <input
                className={classnames("form-control form-control-md", {
                  "is-invalid": errors.groupPic
                })}
                type="text"
                placeholder="Enter group picture URL"
                name="groupPic"
                value={this.state.groupPic}
                onChange={this.onChange}
              />
              {errors.groupPic && (
                <div className="alert alert-danger" role="alert">
                  {errors.groupPic}
                </div>
              )}
            </div>

            <div className="form-group ">
              <label>Group Description</label>
              <input
                className={classnames("form-control form-control-md", {
                  "is-invalid": errors.groupDescription
                })}
                type="text"
                placeholder="10 - 30 characters"
                name="groupDescription"
                value={this.state.groupDescription}
                onChange={this.onChange}
              />
              {errors.groupDescription && (
                <div className="alert alert-danger" role="alert">
                  {errors.groupDescription}
                </div>
              )}
            </div>

            <input
              type="submit"
              className="btn btn-outline-primary btn-block mt-4"
            />
          </form>
        </div>
      </Container>
    );
  }
}

GroupCreate.propTypes = {
  createGroup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createGroup }
)(GroupCreate);
