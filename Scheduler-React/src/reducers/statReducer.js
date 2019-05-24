const initialState = {
  ml: [],
  top: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ML":
      console.log("you are in ML AND TOP 3reducer after you fetch: ");
      console.log(action.payload);
      return {
        ...state,
        ml: action.payload
      };
    case "FETCH_TOP":
      return {
        ...state,
        top: action.payload
      };
    default:
      return state;
  }
}
