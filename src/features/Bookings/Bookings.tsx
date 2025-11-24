import { FC, useState } from "react";

import { BookingCard } from "@features/Bookings/components/BookingCard/BookingCard";
import { AddBookingForm } from "@features/Bookings/components/AddBookingForm/AddBookingForm";
import { Modal } from "@/components/Modal/Modal";
import { useAppSelector } from "@/store/hooks";

export const Bookings: FC = () => {
  const bookings = useAppSelector((state) => state.bookingsReducer.bookings);
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
        </>
      ) : (
        <>
          {bookings?.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))}
        </>
      )}
      <button
        onClick={() => {
          setShowAddForm((prevState) => !prevState);
        }}
      >
        Add booking
      </button>
      <Modal open={showAddForm} onClose={toggleAddForm}>
        <AddBookingForm onClose={toggleAddForm} />
      </Modal>
    </div>
  );
};
