import { createSlice } from "@reduxjs/toolkit";
import { Booking } from "@features/Bookings/types/Booking";

export interface BookingsState {
  bookings: Booking[];
}

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [] as Booking[],
  },
  reducers: {
    addBooking: (
      state: BookingsState,
      action: { payload: Omit<Booking, "id"> }
    ) => {
      const newBooking: Booking = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      return { bookings: [...state.bookings, newBooking] };
    },
    deleteBooking: (state: BookingsState, action: { payload: string }) => {
      return {
        bookings: state.bookings.filter(
          (booking) => booking.id !== action.payload
        ),
      };
    },
    editBooking: (state: BookingsState, action: { payload: Booking }) => {
      return {
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        ),
      };
    },
  },
});

export const { addBooking, deleteBooking, editBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
