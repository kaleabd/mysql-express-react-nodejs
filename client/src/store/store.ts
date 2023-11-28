import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./slices/companiesSlice";

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = any;
