const initalState = {
  tasks: [],
  personalTasksInGroup: [],
  user: {},
  stat: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload
      };
    case "FETCH_TASKS":
      return {
        ...state,
        tasks: action.payload
      };
    case "FETCH_USERGROUP_TASKS":
      return {
        ...state,
        personalTasksInGroup: action.payload
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== action.payload)
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...action.payload } : task
        )
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case "FETCH_STAT":
      return {
        ...state,
        stat: action.payload
      };
    default:
      return state;
  }
}
