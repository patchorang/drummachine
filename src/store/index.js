import { configureStore } from "@reduxjs/toolkit";
import controllerReducer from "./slices/controllerSlice";
import beatReducer from "./slices/beatSlice";

export const store = configureStore({
  reducer: {
    controller: controllerReducer,
    beat: beatReducer,
  },
});
