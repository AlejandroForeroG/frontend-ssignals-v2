import { configureStore } from "@reduxjs/toolkit";
import signalsReducer from "../features/Signals";
import userReducer from "../features/user";
import { apiSlice } from "../services/apiSlice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    signals: signalsReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
