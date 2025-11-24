import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "@/features/Bookings/store/bookingsSlice";

export const store = configureStore({
  reducer: {
    bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
