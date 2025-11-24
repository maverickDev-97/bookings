import type { FC } from "react";
import type { Booking } from "@features/Bookings/types/Booking";
import { formatDate, countDuration } from "@features/Bookings/utils/dateUtils";
import styles from "./BookingCard.module.css";
import { Button } from "@/components/Button/Button";

interface BookingCardProps {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onDelete: (id: string) => void;
}

export const BookingCard: FC<BookingCardProps> = ({
  booking,
  onDelete,
  onEdit,
}) => {
  const duration = countDuration(booking);

  return (
    <div className={styles.card}>
      <h2>{booking?.propertyName}</h2>
      <span>
        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
      </span>
      <div>
        <span>
          {duration} night{duration !== 1 ? "s" : ""}
        </span>
      </div>
      <div>
        <Button
          title="Edit"
          onClick={() => onEdit(booking)}
          variant="secondary"
        />
        <Button
          title="Delete"
          onClick={() => onDelete(booking.id)}
          variant="secondary"
        />
      </div>
    </div>
  );
};
