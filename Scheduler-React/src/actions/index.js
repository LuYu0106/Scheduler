import axios from "axios";
import history from "../history";

import { FETCH_GROUPS, GET_ERRORS } from "./types";

const requestHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("JsonWebToken")
  }
};

export const createGroup = formValues => async dispatch => {
  try {
    const response = await axios.post(
      "/api/group",
      {
        ...formValues
      },
      requestHeader
    ); // adding the userid into the object

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/groupmain");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const fetchGroups = () => async dispatch => {
  const response = await axios.get("/api/group", requestHeader);
  dispatch({
    type: FETCH_GROUPS,
    payload: response.data
  });
};

export const findGroup = formValues => async dispatch => {
  try {
    const response = await axios.post(
      "/api/group/joinNewGroup",
      {
        ...formValues
      },
      requestHeader
    ); // adding the userid into the object

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/groupmain");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const fetchTop = () => async dispatch => {
  const response = await axios.get("/api/ranking", requestHeader);
  dispatch({
    type: "FETCH_TOP",
    payload: response.data
  });
};

export const fetchML = () => async dispatch => {
  const response = await axios.get("/api/ranking/ml", requestHeader);
  dispatch({
    type: "FETCH_ML",
    payload: response.data
  });
};
