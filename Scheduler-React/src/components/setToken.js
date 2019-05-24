import axios from "axios";

// Function setToken
const setToken = token => {
  // When we have a token
  if (token) {
    // Set the "Authorization" with the token value
    // We can't change the name of "Authorization"
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // When we don't have a token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;
