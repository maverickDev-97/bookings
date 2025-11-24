import { FC, useState } from "react";
import { BookingCard } from "@features/Bookings/components/BookingCard/BookingCard";
import { Booking } from "@features/Bookings/types/Booking";

export const Bookings: FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = () => {
    const newBooking: Booking = {
      endDate: new Date(),
      startDate: new Date(),
      propertyName: `Property ${bookings.length}`,
      id: crypto.randomUUID(),
    };

    setBookings((prevState) => [...prevState, newBooking]);
  };

  return (
    <div>
      <h1>Bookings</h1>
      {bookings.length === 0 ? (
        <>
          <h3>No bookings yet</h3>
          <button onClick={addBooking}>Add booking</button>
        </>
      ) : (
        <>
          {bookings?.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))}
        </>
      )}
    </div>
  );
};
