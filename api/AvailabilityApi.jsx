import { users, availability, groups } from "./data";

const AvailabilityApi = {
  availabilityData: [...availability],

  async setAvailability() {},
  async getAvailability() {},
  async getGroupsByUser(userID) {},
  async getUsersByGroup(groupID) {},
  async updateGroup(groupID, groupname, userIDs) {},
  async updateUser(userID, username, image) {},
  async addUserToGroup(userID, groupID) {},
  async removeUserFromGroup(userID, groupID) {},

  async getAvailabilityByUser(userID, startDate, endDate) {
    //console.log("Get availabilityByUser called", userID, startDate, endDate);
    const startDateIso = startDate.toISOString().split("T")[0];
    const endDateIso = endDate.toISOString().split("T")[0];

    return this.availabilityData.filter(
      ({ userID: id, date }) =>
        id === userID && date >= startDateIso && date <= endDateIso
    );
  },

  async getAvailabilityByGroup(groupID, date) {
    //console.log("Get availability by group called", groupID, date);
    const startDateIso = date.toISOString().split("T")[0];
    const group = groups.find((group) => group.groupId === groupID.toString());
    if (!group) {
      throw new Error(`Group not found: ${groupId}`);
    }
    const userIDs = group.userIDs;

    return this.availabilityData.filter(
      ({ userID: id, date: availabilityDate }) =>
        userIDs.includes(id) && availabilityDate === startDateIso
    );
  },

  async updateAvailabilityByUser(userID, startDate, endDate, hours) {
    console.log(
      "UpdateAvailabilityByUser called",
      userID,
      startDate,
      endDate,
      hours
    );
    const startDateIso = startDate.toISOString().split("T")[0];
    const endDateIso = endDate.toISOString().split("T")[0];

    Object.keys(hours).forEach((dateIso) => {
      const existingItem = this.availabilityData.find(
        ({ date, userID: id }) => date === dateIso && id === userID
      );

      if (dateIso >= startDateIso && dateIso <= endDateIso) {
        existingItem
          ? this.compareAndSyncHours(existingItem, hours[dateIso])
          : this.addAvailabilityItem(userID, dateIso, hours[dateIso]);
      } else {
        this.removeAvailabilityItem(userID, dateIso);
      }
    });

    return Promise.resolve();
  },

  async updateAvailabilityByGroup(
    dateIso,
    startDate,
    endDate,
    usersAvailability
  ) {
    console.log(
      "Update availability by group called",
      dateIso,
      startDate,
      endDate,
      usersAvailability
    );

    Object.keys(usersAvailability).forEach((userID) => {
      const hours = usersAvailability[userID];
      this.updateAvailabilityByUser(userID, startDate, endDate, {
        [dateIso]: hours,
      });
    });

    return Promise.resolve();
  },

  addAvailabilityItem(userID, dateIso, hours) {
    console.log("Adding availability item for date:", dateIso);
    const newHours = Object.keys(hours)
      .filter((hour) => hours[hour])
      .map(Number);
    this.availabilityData.push({ userID, date: dateIso, hours: newHours });
  },

  removeAvailabilityItem(userID, dateIso) {
    console.log("Removing availability item for date:", dateIso);
    const index = this.availabilityData.findIndex(
      ({ date, userID: id }) => date === dateIso && id === userID
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
