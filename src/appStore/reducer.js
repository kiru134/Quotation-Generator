const initialState = null;

const selectedQuoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_QUOTE":
      return action.payload;

    case "CLEAR_SELECTED_QUOTE":
      return null;
    case "UPDATE_SELECTED_QUOTE":
      console.log(action.payload.ID);
      if (action.payload.ID === undefined) {
        action.payload.ID = state.ID;
      }
      return action.payload;
    default:
      return state;
  }
};

export default selectedQuoteReducer;
