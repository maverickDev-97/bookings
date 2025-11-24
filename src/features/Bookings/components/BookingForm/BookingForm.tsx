import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAvailableProperties } from "@features/Bookings/api/requests/getAvaliableProperties";
import { Property } from "@features/Bookings/types/Property";
import { ValidationError } from "@features/Bookings/types/ValidationError";
import {
  addBooking,
  editBooking,
} from "@features/Bookings/store/bookingsSlice";
import {
  checkOverlap,
  validateDates,
} from "@features/Bookings/utils/dateUtils";
import { useAppSelector } from "@/store/hooks";
import type { Booking } from "@features/Bookings/types/Booking";

interface BookingFormProps {
  editingBooking: Booking | null;
  onClose: () => void;
}

export const BookingForm: FC<BookingFormProps> = ({
  onClose,
  editingBooking,
}) => {
  const bookings = useAppSelector((state) => state.bookingsReducer.bookings);
  const dispatch = useDispatch();

  const [availableProperties, setAvailableProperties] = useState<Property[]>(
    []
  );

  const [formData, setFormData] = useState({
    propertyName: editingBooking?.propertyName || "",
    startDate: editingBooking?.startDate || "",
    endDate: editingBooking?.endDate || "",
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setErrors([]);

    if (!formData.propertyName) {
      setErrors([{ message: "Please select a property" }]);
      return;
    }

    const dateErrors = validateDates(formData.startDate, formData.endDate);
    if (dateErrors.length > 0) {
      setErrors(dateErrors);
      return;
    }

    if (checkOverlap(formData, bookings, editingBooking?.id)) {
      setErrors([{ message: "There is already a booking for these days" }]);
      return;
    }

    if (editingBooking) {
      dispatch(
        editBooking({
          ...formData,
          id: editingBooking.id,
        })
      );
    } else {
      dispatch(addBooking(formData));
    }

    onClose();
  };

  useEffect(() => {
    getAvailableProperties().then((data) => setAvailableProperties(data));
  });

  return (
    <div>
      <h2>{editingBooking ? "Edit Booking" : "Add New Booking"}</h2>
      {/* Property */}
      <div>
        <label>Property</label>
        <select
          disabled={availableProperties?.length === 0}
          onChange={handleChange}
          name="propertyName"
          value={formData.propertyName}
        >
          {availableProperties?.length === 0 ? (
            <option value="" disabled={availableProperties?.length !== 0}>
              Loading...
            </option>
          ) : (
            <>
              <option value="" disabled>
                Choose property
              </option>
              {availableProperties?.map((property) => (
                <option
                  key={property?.id}
                  value={property?.name}
                  id={property?.id}
                >
                  {property?.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      {/* Start date */}
      <div>
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      {/* End date */}
      <div>
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>
      {/* Errors */}
      <div>
        {errors.length > 0 && (
          <div>
            <div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#f2c2c4",
                  color: "#d9161f",
                }}
              >
                {errors.map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Buttons */}
      <div>
        <button onClick={handleSubmit}>
          {editingBooking ? "Save changes" : "Add new booking"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
