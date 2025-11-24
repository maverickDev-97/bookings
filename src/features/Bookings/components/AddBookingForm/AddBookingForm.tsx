import { useEffect } from "react";
import { getAvailableProperties } from "@features/Bookings/api/requests/getAvaliableProperties";

export const AddBookingForm = () => {
  useEffect(() => {
    getAvailableProperties().then((data) => console.log(data));
  });

  return <>Add Booking Form</>;
};
