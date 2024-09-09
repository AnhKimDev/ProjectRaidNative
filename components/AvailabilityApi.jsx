import { users, availability } from "./data";

const AvailabilityApi = {
  availabilityData: [...availability],

  async getAvailability(userId, startDate, endDate) {
    console.log("Get availability called");
    const startDateIso = startDate.toISOString().split("T")[0];
    const endDateIso = endDate.toISOString().split("T")[0];

    return this.availabilityData.filter(
      ({ userId: id, date }) =>
        id === userId && date >= startDateIso && date <= endDateIso
    );
  },

  async updateAvailability(userId, startDate, endDate, hours) {
    console.log("Update availability called");
    const startDateIso = startDate.toISOString().split("T")[0];
    const endDateIso = endDate.toISOString().split("T")[0];

    Object.keys(hours).forEach((dateIso) => {
      const existingItem = this.availabilityData.find(
        ({ date, userId: id }) => date === dateIso && id === userId
      );

      if (dateIso >= startDateIso && dateIso <= endDateIso) {
        existingItem
          ? this.compareAndSyncHours(existingItem, hours[dateIso])
          : this.addAvailabilityItem(userId, dateIso, hours[dateIso]);
      } else {
        this.removeAvailabilityItem(userId, dateIso);
      }
    });

    return Promise.resolve();
  },

  addAvailabilityItem(userId, dateIso, hours) {
    console.log("Adding availability item for date:", dateIso);
    const newHours = Object.keys(hours)
      .filter((hour) => hours[hour])
      .map(Number);
    this.availabilityData.push({ userId, date: dateIso, hours: newHours });
  },

  removeAvailabilityItem(userId, dateIso) {
    console.log("Removing availability item for date:", dateIso);
    const index = this.availabilityData.findIndex(
      ({ date, userId: id }) => date === dateIso && id === userId
    );
    if (index !== -1) {
      this.availabilityData.splice(index, 1);
    }
  },

  compareAndSyncHours(existingItem, hours) {
    console.log("Updating availability item for date:", existingItem.date);
    const newHours = existingItem.hours.slice();
    Object.keys(hours).forEach((hour) => {
      if (hours[hour]) {
        if (!newHours.includes(parseInt(hour))) {
          newHours.push(parseInt(hour));
        } else {
          newHours.splice(newHours.indexOf(parseInt(hour)), 1);
        }
      } else {
        newHours.splice(newHours.indexOf(parseInt(hour)), 1);
      }
    });
    existingItem.hours = [...new Set(newHours)];
  },
};

export default AvailabilityApi;
