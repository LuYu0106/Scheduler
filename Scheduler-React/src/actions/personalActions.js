import axios from "axios";
import jwt_decode from "jwt-decode";

const requestHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("JsonWebToken")
  }
};

export function fetchPrivateTasks() {
  const url = "/api/task/personalTask";

  return async function(dispatch) {
    axios.get(url, requestHeader).then(reponse =>
      dispatch({
        type: "FETCH_TASKS",
        payload: reponse.data
      })
    );
  };
}

export const fetchAllGroupTasks = groupId => async dispatch => {
  const decoded = jwt_decode(localStorage.getItem("JsonWebToken"));
  const response = await axios.get("/api/task/group/" + groupId, requestHeader);
  dispatch({
    type: "FETCH_TASKS",
    payload: response.data
  });
  dispatch({
    type: "ADD_USER",
    payload: decoded
  });
};

export const fetchUsersTasksInGroup = groupId => {
  const url = "/api/task/selectedTasks/" + groupId;
  return async function(dispatch) {
    axios.get(url, requestHeader).then(reponse =>
      dispatch({
        type: "FETCH_USERGROUP_TASKS",
        payload: reponse.data
      })
    );
  };
};

export function deleteTask(taskID) {
  const url = "/api/task/id/" + taskID;
  return async function(dispatch) {
    axios.delete(url, requestHeader).then(reponse =>
      dispatch({
        type: "DELETE_TASK",
        payload: taskID
      })
    );
  };
}

export function editTask(task) {
  const url = "/api/task/saveTask/";
  console.log(localStorage.getItem("JsonWebToken"));
  console.log(task);

  return async function(dispatch) {
    axios
      .post(url, task, requestHeader)
      .then(reponse =>
        dispatch({
          type: "EDIT_TASK",
          payload: reponse.data
        })
      )
      .catch(error => {
        console.log(error);
      });
  };
}

export function createTask(task) {
  const url = "/api/task/saveTask/";

  return async function(dispatch) {
    axios.post(url, task, requestHeader).then(reponse =>
      dispatch({
        type: "ADD_TASK",
        payload: reponse.data
      })
    );
  };
}

export function getGroupChartData(groupId) {
  console.log("getGroupChartData in action ");
  console.log(groupId);
  const url = "/api/task/groupStat/" + groupId;
  return async function(dispatch) {
    axios.get(url, requestHeader).then(reponse =>
      dispatch({
        type: "FETCH_STAT",
        payload: reponse.data
      })
    );
  };
}

export function getUserChartData() {
  console.log("getUserChartData in action ");

  const url = "/api/task/personalStat";
  return async function(dispatch) {
    const response = await axios.get(url, requestHeader);
    console.log("getresponseback");
    console.log(response.data);
    dispatch({
      type: "FETCH_STAT",
      payload: response.data
    });
  };
}
