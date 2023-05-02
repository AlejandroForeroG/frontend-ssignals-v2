import { configureStore } from "@reduxjs/toolkit";
import signalsReducer from "../features/signalsName";
import { apiSlice } from "../services/apiSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    signals: signalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
