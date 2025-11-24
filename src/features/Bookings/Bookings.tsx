import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { BookingCard } from "@features/Bookings/components/BookingCard/BookingCard";
import { BookingForm } from "@/features/Bookings/components/BookingForm/BookingForm";
import { Modal } from "@/components/Modal/Modal";
import { useAppSelector } from "@/store/hooks";
import { deleteBooking } from "@features/Bookings/store/bookingsSlice";

import type { Booking } from "@features/Bookings/types/Booking";
import { Button } from "@/components/Button/Button";

import styles from "./Bookings.module.css";

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
      <div className={styles.header}>
        <h1>Bookings</h1>
        <Button onClick={handleAddBooking} title="Add booking" />
      </div>
      <div className={styles.content}>
        {bookings.length === 0 ? (
          <>
            <h3>No bookings yet</h3>
          </>
        ) : (
          <div className={styles.bookingsList}>
            {bookings?.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
      <Modal open={showForm} onClose={handleCloseForm}>
        <BookingForm
          onClose={handleCloseForm}
          editingBooking={editingBooking}
        />
      </Modal>
    </div>
  );
};
