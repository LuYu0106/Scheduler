import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// To make sure users can't see other private pages unless they log in to the app.
const privateRoute = ({ component: Component, userState, ...res }) => (
  <Route
    {...res}
    render={props =>
      userState.isTokenValid === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

privateRoute.propTypes = {
  userState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userState: state.userState
});

export default connect(mapStateToProps)(privateRoute);
