import { configureStore } from "@reduxjs/toolkit";
import selectedQuoteReducer from "./reducer";

// Define a root reducer
const rootReducer = {
  selectedQuote: selectedQuoteReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
