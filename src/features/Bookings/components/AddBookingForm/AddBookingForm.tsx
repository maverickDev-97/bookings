import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAvailableProperties } from "@features/Bookings/api/requests/getAvaliableProperties";
import { Property } from "@features/Bookings/types/Property";
import { addBooking } from "@features/Bookings/store/bookingsSlice";

interface AddBookingFormProps {
  onClose: () => void;
}

export const AddBookingForm: FC<AddBookingFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [availableProperties, setAvailableProperties] = useState<Property[]>(
    []
  );

  const [formData, setFormData] = useState({
    propertyName: "",
    guest: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addBooking(formData));
  };

  useEffect(() => {
    getAvailableProperties().then((data) => setAvailableProperties(data));
  });

  return (
    <div>
      <h2>Add New Booking</h2>
      {/* Property */}
      <div>
        <label>Property</label>
        <select
          disabled={availableProperties?.length === 0}
          onChange={handleChange}
          name="propertyName"
          value={formData.propertyName}
        >
          <option value="" disabled={availableProperties?.length !== 0}>
            Choose property
          </option>
          {availableProperties?.map((property) => (
            <option key={property?.id} value={property?.name} id={property?.id}>
              {property?.name}
            </option>
          ))}
        </select>
      </div>
      {/* Guest */}
      <div>
        <label>Guest</label>
        <input
          type="text"
          name="guest"
          value={formData.guest}
          onChange={handleChange}
          placeholder="Guest name"
        />
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
      <div>
        <button onClick={handleSubmit}>Add new booking</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
