import {
  DatabaseInterface,
  Availability,
  Group,
  User,
  Event,
} from "../interface/DatabaseInterface";

export class cosmosDBadapter implements DatabaseInterface {
  private mockData: {
    availability: Availability[];
    groups: Group[];
    users: User[];
    events: Event[];
  };
  getAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date
  ): Promise<Availability[]> {
    throw new Error("Method not implemented.");
  }
  getAvailabilityByGroup(groupID: number, date: Date): Promise<Availability[]> {
    throw new Error("Method not implemented.");
  }
  updateAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: number[]
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateAvailabilityByGroup(
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: number[]
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getGroupByGroupID(groupID: string): Promise<Group> {
    throw new Error("Method not implemented.");
  }
  getGroupsByUserID(userID: string): Promise<Group[]> {
    throw new Error("Method not implemented.");
  }
  createGroup(groupName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateGroup(groupID: number, groupName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteGroup(groupID: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUser(userID: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUsersByGroupIDs(groupIDs: string[]): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  createUser(userName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateUser(userID: number, userName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteUser(userID: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getEvent(eventID: string): Promise<Event> {
    throw new Error("Method not implemented.");
  }
  getEvents(): Promise<Event[]> {
    throw new Error("Method not implemented.");
  }
  createEvent(
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateEvent(
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
    throw new Error("Method not implemented.");
  }
  deleteEvent(eventID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const cosmosdbAdapterInstance = new cosmosDBadapter();
export default cosmosdbAdapterInstance;
