import _ from "lodash";
import {
  CREATE_GROUP,
  FETCH_GROUPS,
  FETCH_GROUP,
  FIND_GROUP
} from "../actions/types";

// if state was not set, set it as an empty object
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return { ...state, [action.payload.groupId]: action.payload };
    case FETCH_GROUPS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    // case FETCH_GROUP:
    //   return { ...state, [action.payload.groupId]: action.payload };
    case FIND_GROUP:
      return { ...state, [action.payload.groupId]: action.payload };
    default:
      return state;
  }
};
