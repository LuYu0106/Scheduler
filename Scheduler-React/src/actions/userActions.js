// Axios is a Javascript library used to make HTTP requests from node.js
// or XMLHttpRequests from the browser that also supports the ES6 Promise API.
import axios from "axios";
import setToken from "../components/setToken";
import jwt_decode from "jwt-decode";

export const createUser = (user, history) => async dispatch => {
  try {
    const response = await axios.post("/api/user/signup", user);
    history.push("/");
    dispatch({
      type: "GET_ERRORS",
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data
    });
  }
};

// LoginRequest is an object that takes the user's username and password
export const login = LoginRequest => async dispatch => {
  try {
    console.log("you are in Huangzhao's login action 1...");
    // Post and pass in the LoginRequest
    const response = await axios.post("/api/user/login", LoginRequest);
    console.log(response);

    // Extract the token from the response.data got from the back end
    const { token } = response.data;
    console.log("here is the token without decoding...");
    console.log(token);

    // Store the JWT(Json Web Token) token in the localStorage (Browser Storage)
    // Important step
    // We can use whatever name we want to store the token
    localStorage.setItem("JsonWebToken", token);

    // Make sure that we set our token in header (Json Web Token).
    // Header (authorization and the token)
    setToken(token);

    // Decode the JWT(Json Web Token) token on React
    const decodedToken = jwt_decode(token);

    console.log("here is the decoded token ...");
    console.log(decodedToken);

    // Dispatch to the userReducer
    dispatch({
      type: "FETCH_USER",
      payload: decodedToken
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data
    });
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem("JsonWebToken");
  setToken(false);
  dispatch({
    type: "FETCH_USER",
    payload: {}
  });
};
