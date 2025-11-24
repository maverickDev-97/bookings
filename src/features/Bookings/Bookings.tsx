import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { BookingCard } from "@features/Bookings/components/BookingCard/BookingCard";
import { BookingForm } from "@/features/Bookings/components/BookingForm/BookingForm";
import { Modal } from "@/components/Modal/Modal";
import { useAppSelector } from "@/store/hooks";
import { deleteBooking } from "@features/Bookings/store/bookingsSlice";

import type { Booking } from "@features/Bookings/types/Booking";
import { Button } from "@/components/Button/Button";

export const Bookings: FC = () => {
  const dispatch = useDispatch();
  const bookings = useAppSelector((state) => state.bookingsReducer.bookings);

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const [showForm, setShowForm] = useState(false);

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id));
  };

  const handleAddBooking = () => {
    setEditingBooking(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBooking(null);
  };

  return (
    <div className="container">
      <h1>Bookings</h1>
      {bookings.length === 0 ? (
        <>
          <h3>No bookings yet</h3>
        </>
      ) : (
        <>
          {bookings?.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
      <Button onClick={handleAddBooking} title="Add booking" />
      <Modal open={showForm} onClose={handleCloseForm}>
        <BookingForm
          onClose={handleCloseForm}
          editingBooking={editingBooking}
        />
      </Modal>
    </div>
  );
};
