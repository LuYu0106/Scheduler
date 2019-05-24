import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/userActions";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.isTokenValid) {
      this.props.history.push("/main");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // This method is only called once.
  // To make sure the user can't go back to this page once he/she is logged in.
  componentDidMount() {
    // If the token is valid
    if (this.props.userState.isTokenValid) {
      // Push groupmain to history
      this.props.history.push("/main");
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.username);
    // console.log(this.state.password);
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(LoginRequest);
  };

  render() {
    const { errors } = this.state;

    return (
      <body className="bg1" style={{ color: "#ffffff" }}>
        <div className="aa">
          <div className="row">
            <div className="col-md-4 cold-sm-4 col-xs-12" />
            <div className="col-md-4 cold-sm-4 col-xs-12">
              {/*form starts*/}
              <form className="form-container" onSubmit={this.handleSubmit}>
                <h3>Log In</h3>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
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
                    className={classnames("form-control form-control-lg", {
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
                <br />

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{
                    backgroundColor: "#dc7799",
                    borderColor: "#dc7799"
                  }}
                >
                  Log In
                </button>

                <br />

                <p className="sign-notamember">
                  Not a member? &nbsp;
                  <Link to="/signup" style={{ color: "#dc7799" }}>
                    <u>Sign Up</u>
                  </Link>
                </p>
              </form>
              {/*form ends*/}
            </div>
            <div className="col-md-4 cold-sm-4 col-xs-12" />
          </div>
        </div>
      </body>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // state.userState and state.errors from index.js
  userState: state.userState,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
