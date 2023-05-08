import { configureStore } from "@reduxjs/toolkit";
import signalsReducer from "./slices/Signals";
import userReducer from "./slices/user";
import slideReducer from "./slices/Slide";
import userApi from "./services/userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    signals: signalsReducer,
    user: userReducer,
    slide: slideReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
