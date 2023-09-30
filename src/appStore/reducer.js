const initialState = {
  id: "",
};

const selectedQuoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_QUOTE":
      return action.payload;

    case "CLEAR_SELECTED_QUOTE":
      return initialState;
    case "UPDATE_SELECTED_QUOTE":
      return action.payload;
    default:
      return state;
  }
};

export default selectedQuoteReducer;
