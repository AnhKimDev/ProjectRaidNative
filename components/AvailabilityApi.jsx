import { users, availability } from "./data";

const AvailabilityApi = {
  async getAvailability(userId, startDate, endDate) {
    return availability.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        item.userId === userId && itemDate >= startDate && itemDate <= endDate
      );
    });
  },

  async updateAvailability(userId, date, hours) {
    // TO DO: implement update logic when you have a real backend API
    console.log("Update availability called:", userId, date, hours);
    return Promise.resolve(); // dummy implementation
  },
};

export default AvailabilityApi;
