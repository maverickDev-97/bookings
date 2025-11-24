import type { FC } from "react";
import type { Booking } from "@features/Bookings/types/Booking";

export const BookingCard: FC<Booking> = ({ propertyName }) => {
  return (
    <>
      <h1>{propertyName}</h1>
    </>
  );
};
