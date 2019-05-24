import React, { Component } from "react";
import classnames from "classnames";
import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch } from "react-router-dom";

export default class Homepage extends Component {
  render() {
    return (
      <div className="bg1">
        <div>
          <Link to={"/signup"}>
            <button
              className="btn btn-primary b1"
              type="button"
              style={{
                backgroundColor: "#009999",
                borderColor: "#009999",
                marginTop: "15px",
                marginRight: "15px"
              }}
            >
              Sign Up
            </button>
          </Link>

          <Link to={"/login"}>
            <button
              className="btn btn-primary b1"
              type="button"
              style={{
                backgroundColor: "#009999",
                borderColor: "#009999",
                marginTop: "15px",
                marginRight: "15px"
              }}
            >
              Log In
            </button>
          </Link>
        </div>
        <br />
        <br />
        <br />

        <p
          style={{
            color: "#009999",
            fontSize: "60px",
            textAlign: "center",
            fontFamily: "Marker Felt"
          }}
        >
          Welcome to Scheduler!
        </p>
        <br />
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 cold-sm-4= col-xs-12" />
            <div className="col-md-12 cold-sm-4 col-xs-12">
              {/*form starts*/}
              <form className="form-container">
                <p
                  style={{
                    color: "#433535",
                    fontSize: "40px",
                    textAlign: "center",
                    fontFamily: "Comic Sans MS"
                  }}
                >
                  Discover the creative tool for online education
                </p>
                <p
                  style={{
                    color: "#433535",
                    fontSize: "26px",
                    textAlign: "center",
                    fontFamily: "Tahoma"
                  }}
                >
                  Scheduler lets you organize daily plans, tasks and projects in
                  a more efficient way. It can also help with time-management,
                  capability exploration, and collaboration.
                </p>
                <p
                  style={{
                    color: "#433535",
                    fontSize: "19px",
                    textAlign: "center",
                    fontFamily: "Tahoma"
                  }}
                >
                  - For individuals and groups
                </p>
              </form>
              {/*form ends*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
