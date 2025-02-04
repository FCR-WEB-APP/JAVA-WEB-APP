import { configureStore } from "@reduxjs/toolkit";
import caseReducer from "../features/caseSlice";

const store = configureStore({
  reducer: {
    case: caseReducer,
  },
});

export default store;
