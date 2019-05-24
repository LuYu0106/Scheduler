const initialState = {
  isTokenValid: false,

  // Here user is an empty object
  user: {}
};

const checkPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        isTokenValid: checkPayload(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
