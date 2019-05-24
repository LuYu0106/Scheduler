import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import Personal from "./personal";
import GroupMain from "./Groups/GroupMain";
import GroupCreate from "./Groups/GroupCreate";
import GroupJoin from "./Groups/GroupJoin";
import Homepage from "./homepage";
import Login from "./UserActivities/Login";
import Signup from "./UserActivities/Signup";
import history from "../history";
import SingleGroupUI from "../components/Groups/SingleGroupUI";
import recommendation from "../components/RankingRecommendation/recommendation";
import ranking from "../components/RankingRecommendation/ranking";
import Main from "./Mainpage/main";
import setToken from "./setToken";
import jwt_decode from "jwt-decode";
import store from "../store";
import PrivateRoute from "../privateRoute";
import { signout } from "../actions/userActions";

/* We need to check the token so the token is still valid no matter which route we go
 * after we log in.
 */
const token = localStorage.JsonWebToken;

// If the token is stored in the localStorage, then call setToken method.
if (token) {
  setToken(token);
  // Decode the token
  const decodedToken = jwt_decode(token);

  store.dispatch({
    type: "FETCH_USER",
    payload: decodedToken
  });

  var start = Date.now();

  // 1000 ms
  if (decodedToken.exp < start / 1000) {
    store.dispatch(signout());
    // Redirect to the homepage
    window.location.href = "/";
  }
}

export default class navApp extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Switch>
            <PrivateRoute exact path="/main" component={Main} />
            <PrivateRoute exact path="/groupmain" component={GroupMain} />
            <PrivateRoute exact path="/groups/new" component={GroupCreate} />
            <PrivateRoute exact path="/groups/join" component={GroupJoin} />
            <PrivateRoute exact path="/personal" component={Personal} />
            <PrivateRoute
              exact
              path="/groupstask/:id"
              component={SingleGroupUI}
            />
            <PrivateRoute
              exact
              path="/recommendation"
              component={recommendation}
            />
            <PrivateRoute exact path="/ranking" component={ranking} />
          </Switch>
        </Router>
      </div>
    );
  }
}
