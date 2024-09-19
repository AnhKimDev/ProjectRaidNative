import {
  DatabaseInterface,
  Availability,
  Group,
  User,
  Event,
} from "./../interface/DatabaseInterface";
import { groups, users, availability, events } from "./../mockData";

export class MockDatabaseAdapter implements DatabaseInterface {
  private mockData: {
    availability: Availability[];
    groups: Group[];
    users: User[];
    events: Event[];
  } = {
    availability,
    groups,
    users,
    events,
  };

  async getAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date
  ): Promise<Availability[]> {
    const startDateIso = startDate.toISOString().split("T")[0];
    const endDateIso = endDate.toISOString().split("T")[0];

    return this.mockData.availability.filter(
      ({ userID: id, date }) =>
        id === userID && date >= startDateIso && date <= endDateIso
    );
  }

  async getAvailabilityByGroup(
    groupID: number,
    date: Date
  ): Promise<Availability[]> {
    const startDateIso = date.toISOString().split("T")[0];
    const group = this.mockData.groups.find(
      (group) => group.groupID === String(groupID)
    );

    if (!group) {
      throw new Error(`Group not found: ${groupID}`);
    }

    const userIDs = group.userIDs;

    return this.mockData.availability.filter(
      ({ userID: id, date: availabilityDate }) =>
        userIDs.includes(id) && availabilityDate === startDateIso
    );
  }

  async updateAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: number[]
  ): Promise<void> {
    const startDateIso = startDate.toISOString().split("T")[0];
    const endDateIso = endDate.toISOString().split("T")[0];

    Object.keys(hours).forEach((dateIso) => {
      const existingItem = this.mockData.availability.find(
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
  }

  addAvailabilityItem(userID: string, dateIso: string, hours: number[]) {
    console.log("Adding availability item for date:", dateIso);
    const newHours = Object.keys(hours)
      .filter((hour) => hours[hour])
      .map(Number);
    this.mockData.availability.push({ userID, date: dateIso, hours: newHours });
  }
  removeAvailabilityItem(userID: string, dateIso: string) {
    console.log("Removing availability item for date:", dateIso);
    const index = this.mockData.availability.findIndex(
      ({ date, userID: id }) => date === dateIso && id === userID
    );
    if (index !== -1) {
      this.mockData.availability.splice(index, 1);
    }
  }
  compareAndSyncHours(existingItem: Availability, hours: number[]) {
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
  }

  async updateAvailabilityByGroup(
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: number[]
  ): Promise<void> {
    Object.keys(usersAvailability).forEach((userID) => {
      const hours = usersAvailability[userID];
      const result = { [dateIso]: hours } as number[];
      this.updateAvailabilityByUser(userID, startDate, endDate, result);
    });
  }

  async getGroupByGroupID(groupID: string): Promise<Group> {
    return this.mockData.groups.find(
      (group) => group.groupID === String(groupID)
    );
  }

  async getGroupsByUserID(userID: string): Promise<Group[]> {
    const result = this.mockData.groups.filter((group) =>
      group.userIDs.includes(userID)
    );
    return result;
  }

  async createGroup(groupName: string): Promise<void> {
    this.mockData.groups.push({
      groupID: String(this.mockData.groups.length + 1),
      name: groupName,
      userIDs: [],
    });
  }

  async updateGroup(groupID: number, groupName: string): Promise<void> {
    const group = this.mockData.groups.find(
      (group) => group.groupID === String(groupID)
    );
    if (group) {
      group.name = groupName;
    }
  }

  async deleteGroup(groupID: number): Promise<void> {
    this.mockData.groups = this.mockData.groups.filter(
      (group) => group.groupID !== String(groupID)
    );
  }

  async getUser(userID: number): Promise<User> {
    return this.mockData.users.find((user) => user.userID === String(userID));
  }
  async getUsersByGroupIDs(groupIDs: string[]): Promise<User[]> {
    const groupUserIDs = groupIDs.flatMap(
      (groupID) =>
        this.mockData.groups.find((group) => group.groupID === groupID).userIDs
    );
    const usersData = this.mockData.users.filter((user) =>
      groupUserIDs.includes(user.userID)
    );
    return usersData;
  }

  async createUser(userName: string): Promise<void> {
    this.mockData.users.push({
      userID: String(this.mockData.users.length + 1),
      name: userName,
      image: "",
      email: undefined,
    });
  }

  async updateUser(userID: number, userName: string): Promise<void> {
    const user = this.mockData.users.find(
      (user) => user.userID === String(userID)
    );
    if (user) {
      user.name = userName;
    }
  }

  async deleteUser(userID: number): Promise<void> {
    this.mockData.users = this.mockData.users.filter(
      (user) => user.userID !== String(userID)
    );
  }

  async getEvent(eventID: string): Promise<Event> {
    return this.mockData.events.find((event) => event.eventID === eventID);
  }

  async getEvents(): Promise<Event[]> {
    return this.mockData.events;
  }

  async createEvent(
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ): Promise<void> {
    console.log(
      "create Event called, ",
      title,
      date,
      startTime,
      endTime,
      suggestedBy,
      userIDs,
      groupIDs,
      description
    );

    if (!title || !date || !startTime || !endTime || !suggestedBy) {
      throw new Error("Missing required parameter");
    }

    if (typeof date !== "string") {
      throw new Error("Invalid date parameter");
    }

    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");

    if (startTimeParts.length !== 2 || endTimeParts.length !== 2) {
      throw new Error("Invalid time format. Expected HH:MM");
    }

    const startTimeHours = parseInt(startTimeParts[0], 10);
    const startTimeMinutes = parseInt(startTimeParts[1], 10);
    const endTimeHours = parseInt(endTimeParts[0], 10);
    const endTimeMinutes = parseInt(endTimeParts[1], 10);

    if (
      isNaN(startTimeHours) ||
      isNaN(startTimeMinutes) ||
      isNaN(endTimeHours) ||
      isNaN(endTimeMinutes)
    ) {
      throw new Error("Invalid time format. Expected HH:MM");
    }

    if (
      startTimeHours < 0 ||
      startTimeHours > 23 ||
      endTimeHours < 0 ||
      endTimeHours > 23
    ) {
      throw new Error("Invalid hour value. Expected 0-23");
    }

    if (
      startTimeMinutes < 0 ||
      startTimeMinutes > 59 ||
      endTimeMinutes < 0 ||
      endTimeMinutes > 59
    ) {
      throw new Error("Invalid minute value. Expected 0-59");
    }

    const eventDate = date; // Convert date to string in YYYY-MM-DD format
    const startTimeFormatted = `${startTimeHours.toString().padStart(2, "0")}:${startTimeMinutes.toString().padStart(2, "0")}`; // Format startTime as HH:MM
    const endTimeFormatted = `${endTimeHours.toString().padStart(2, "0")}:${endTimeMinutes.toString().padStart(2, "0")}`; // Format endTime as HH:MM

    const newEvent: Event = {
      eventID: String(this.mockData.events.length + 1),
      title,
      description,
      date: eventDate,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      suggestedBy,
      userIDs,
      groupIDs,
    };
    this.mockData.events.push(newEvent);
    console.log("event created: ", newEvent);
  }

  async updateEvent(
    eventID: string,
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ): Promise<void> {
    const event = this.mockData.events.find(
      (event) => event.eventID === eventID
    );
    if (event) {
      event.title = title;
      event.description = description;
      event.date = date;
      event.startTime = startTime;
      event.endTime = endTime;
      event.suggestedBy = suggestedBy;
      event.userIDs = userIDs;
      event.groupIDs = groupIDs;
    }
  }

  async deleteEvent(eventID: string): Promise<void> {
    const index = this.mockData.events.findIndex(
      (event) => event.eventID === eventID
    );
    if (index !== -1) {
      this.mockData.events.splice(index, 1);
    }
  }
}

const mockDatabaseAdapterInstance = new MockDatabaseAdapter();
export default mockDatabaseAdapterInstance;
