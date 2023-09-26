export const setSelectedQuote = (quote) => ({
  type: "SET_SELECTED_QUOTE",
  payload: quote,
});

export const clearSelectedQuote = () => ({
  type: "CLEAR_SELECTED_QUOTE",
});

export const updateSelectedQuote = (updatedQuote) => ({
  type: "UPDATE_SELECTED_QUOTE",
  payload: updatedQuote,
});
