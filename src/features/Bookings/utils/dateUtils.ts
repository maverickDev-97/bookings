import type { Booking } from "@features/Bookings/types/Booking";
import type { ValidationError } from "@features/Bookings/types/ValidationError";

export const checkOverlap = (
  newBooking: Omit<Booking, "id"> | Booking,
  existingBookings: Booking[],
  editingId?: string
): boolean => {
  const newStart = new Date(newBooking.startDate);
  const newEnd = new Date(newBooking.endDate);

  return existingBookings.some((booking) => {
    if (editingId && booking.id === editingId) return false;

    const existingStart = new Date(booking.startDate);
    const existingEnd = new Date(booking.endDate);

    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });
};

export const validateDates = (
  startDate: string,
  endDate: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!startDate || !endDate) {
    errors.push({ message: "Start and end dates are required" });
    return errors;
  }

  if (start < today) {
    errors.push({
      field: "startDate",
      message: "Start date cannot be in the past",
    });
  }

  if (end <= start) {
    errors.push({
      field: "endDate",
      message: "End date must be after start date",
    });
  }

  return errors;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const countDuration = (booking: Booking): number => {
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};
