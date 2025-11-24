import data from "../data/availableProperties.json";

export async function getAvailableProperties() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}
