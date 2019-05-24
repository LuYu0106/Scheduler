import React, { Component } from "react";
import JoinNewGroupForm from "./GroupComponents/JoinNewGroupForm";
import { findGroup } from "../../actions/index";
import { connect } from "react-redux";
import JumbotronJoin from "./GroupComponents/JumbotronJoin";
import { Container } from "reactstrap";
import Header from "../Layout/Header";
import classnames from "classnames";
import PropTypes from "prop-types";

class GroupJoin extends Component {
  constructor() {
    super();

    this.state = {
      groupName: "",
      groupPassword: "",
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

    const joinRequest = {
      groupName: this.state.groupName,
      groupPassword: this.state.groupPassword
    };

    this.props.findGroup(joinRequest);
  };

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Header />
        <JumbotronJoin />
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group ">
              <label>Group name</label>
              <input
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

            <input
              type="submit"
              className="btn btn-outline-success btn-block mt-4"
            />
          </form>
        </div>
      </Container>
    );
  }
}

GroupJoin.propTypes = {
  findGroup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { findGroup }
)(GroupJoin);
