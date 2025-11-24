import { Property } from "@features/Bookings/types/Property";
import data from "../data/availableProperties.json";

export async function getAvailableProperties(): Promise<Property[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  });
}
