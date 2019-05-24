import { combineReducers } from "redux";
import groupReducer from "./groupReducers";
import taskReducer from "./taskReducers";
import userReducer from "./userReducers";
import errorReducer from "./errorReducer";
import statReducer from "./statReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  stat: statReducer,
  groups: groupReducer,
  tasks: taskReducer,
  userState: userReducer,
  errors: errorReducer,
  form: formReducer
});
