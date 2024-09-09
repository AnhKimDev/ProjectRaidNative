import { users, availability } from "./data";

const AvailabilityApi = {
  async getAvailability(userId, startDate, endDate) {
    console.log("Get availability called:", userId, startDate, endDate);
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    const availabilityResult = availability.filter((item) => {
      const itemDate = new Date(item.date).getTime();
      return (
        item.userId === userId &&
        itemDate >= startDateTime &&
        itemDate <= endDateTime
      );
    });
    console.log("Returned availability:", availabilityResult);
    return availabilityResult;
  },

  async updateAvailability(userId, date, hours) {
    // TO DO: implement update logic when you have a real backend API
    console.log("Update availability called:", userId, date, hours);
    return Promise.resolve(); // dummy implementation
  },
};

export default AvailabilityApi;
