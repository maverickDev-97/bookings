import { FC, useState } from "react";

import { BookingCard } from "@features/Bookings/components/BookingCard/BookingCard";
import { AddBookingForm } from "@features/Bookings/components/AddBookingForm/AddBookingForm";
import { Booking } from "@features/Bookings/types/Booking";
import { Modal } from "@/components/Modal/Modal";

export const Bookings: FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => {
    setShowAddForm((prevState) => !prevState);
  };

  return (
    <div>
      <h1>Bookings</h1>
      {bookings.length === 0 ? (
        <>
          <h3>No bookings yet</h3>
          <button
            onClick={() => {
              setShowAddForm((prevState) => !prevState);
            }}
          >
            Add booking
          </button>
        </>
      ) : (
        <>
          {bookings?.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))}
        </>
      )}
      <Modal open={showAddForm} onClose={toggleAddForm}>
        <AddBookingForm onClose={toggleAddForm} />
      </Modal>
    </div>
  );
};
