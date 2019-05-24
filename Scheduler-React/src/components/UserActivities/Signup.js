import React, { Component } from "react";
import PropTypes from "prop-types";
import "../homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { createUser } from "../../actions/userActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      gender: "",
      birthday: "",
      highestEducation: "",
      industry: "",
      username: "",
      password: "",
      // Error messages
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // This method is only called once.
  // To make sure the user can't go back to this page once he/she has created an account successfully.
  componentDidMount() {
    // If the token is valid
    if (this.props.userState.isTokenValid) {
      // Push groupmain to history
      this.props.history.push("/main");
    }
  }

  // Takes an event.
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Handles an event.
  handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      gender: this.state.gender,
      birthday: this.state.birthday,
      highestEducation: this.state.highestEducation,
      industry: this.state.industry,
      username: this.state.username,
      password: this.state.password
    };

    this.props.createUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="bg2" style={{ color: "#ffffff" }}>
        <div className="row">
          <div className="col-md-4 cold-sm-4 col-xs-12" />
          <div className="col-md-4 cold-sm-4 col-xs-12">
            {/*form starts*/}
            <form className="form-container" onSubmit={this.handleSubmit}>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.firstName
                  })}
                  placeholder="Enter First Name"
                  id="firstName"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}!</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middel Name (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Middle Name"
                  id="middleName"
                  name="middleName"
                  value={this.state.middleName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.lastName
                  })}
                  placeholder="Enter Last Name"
                  id="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}!</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid": errors.emailAddress
                  })}
                  placeholder="Enter Email Address"
                  id="emailAddress"
                  name="emailAddress"
                  value={this.state.emailAddress}
                  onChange={this.handleChange}
                />
                {errors.emailAddress && (
                  <div className="invalid-feedback">{errors.emailAddress}!</div>
                )}
              </div>

              <div
                className="form-group"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <label>Gender: &nbsp;</label>
                <label htmlFor="male">Male &nbsp;</label>
                <input
                  id="male"
                  type="radio"
                  defaultValue="Male"
                  name="gender"
                />
                &nbsp;&nbsp;
                <label htmlFor="female">Female &nbsp;</label>
                <input
                  id="female"
                  type="radio"
                  defaultValue="Female"
                  name="gender"
                />
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}!</div>
                )}
              </div>

              <div
                className="form-group"
                name="birthday"
                value={this.state.birthday}
                onChange={this.handleChange}
              >
                <label htmlFor="birthday">Birthday</label>
                <input type="date" className="form-control" name="birthday" />
                {errors.birthday && (
                  <div className="invalid-feedback">{errors.birthday}!</div>
                )}
              </div>

              <div
                className="form-group"
                name="highestEducation"
                value={this.state.highestEducation}
                onChange={this.handleChange}
              >
                <label htmlFor="highestEducation">Highest Education</label>
                <select name="highestEducation">
                  <option>Please Select</option>
                  <option>Less than High School</option>
                  <option>High School</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Doctoral Degree</option>
                </select>
                {errors.highestEducation && (
                  <div className="invalid-feedback">
                    {errors.highestEducation}!
                  </div>
                )}
              </div>

              <div
                className="form-group"
                name="industry"
                value={this.state.industry}
                onChange={this.handleChange}
              >
                <label htmlFor="industry">Industry &nbsp;</label>
                <select name="industry">
                  <option>Please Select</option>
                  <option>Agriculture</option>
                  <option>Arts</option>
                  <option>Construction</option>
                  <option>Consumer Goods</option>
                  <option>Corporate</option>
                  <option>Educational</option>
                  <option>Finance</option>
                  <option>Government</option>
                  <option>High Tech</option>
                  <option>Legal</option>
                  <option>Manufacturing</option>
                  <option>Media</option>
                  <option>Non-profit</option>
                  <option>Recreational</option>
                  <option>Service</option>
                </select>
                {errors.industry && (
                  <div className="invalid-feedback">{errors.industry}!</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.username
                  })}
                  placeholder="Enter Username"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}!</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}!</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ backgroundColor: "#dc7799", borderColor: "#dc7799" }}
              >
                Sign Up
              </button>

              <br />
              <p className="sign-notamember">
                Already have an account? &nbsp;
                <Link to="/login" style={{ color: "#dc7799" }}>
                  <u>Log In</u>
                </Link>
              </p>
            </form>
            {/*form ends*/}
          </div>
          <div className="col-md-4 cold-sm-4 col-xs-12" />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userState: state.userState,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createUser }
)(Signup);
