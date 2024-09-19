import Availability from "../../app/(tabs)/availability";

// interface.tsx
export interface DatabaseInterface {
  // Availability API methods
  getAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date
  ): Promise<Availability[]>;
  getAvailabilityByGroup(groupID: number, date: Date): Promise<Availability[]>;
  updateAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: number[] //hours: {hour: 1}
  ): Promise<void>;
  updateAvailabilityByGroup(
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: number[]
  ): Promise<void>;

  // Groups API methods
  getGroupByGroupID(groupID: string): Promise<Group>;
  getGroupsByUserID(userID: string): Promise<Group[]>;
  createGroup(groupName: string): Promise<void>;
  updateGroup(groupID: number, groupName: string): Promise<void>;
  deleteGroup(groupID: number): Promise<void>;

  // Users API methods
  getUser(userID: number): Promise<User>;
  getUsersByGroupIDs(groupIDs: string[]): Promise<User[]>;
  createUser(userName: string): Promise<void>;
  updateUser(userID: number, userName: string): Promise<void>;
  deleteUser(userID: number): Promise<void>;

  // Events API methods
  getEvent(eventID: string): Promise<Event>;
  getEvents(): Promise<Event[]>;
  createEvent(
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ): Promise<void>;
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
  ): Promise<void>;
  deleteEvent(eventID: string): Promise<void>;
}

export interface Group {
  groupID: string;
  name: string;
  userIDs: string[];
}

export interface User {
  userID: string;
  name: string;
  image: string;
  email?: string;
}

export interface Availability {
  date: string;
  userID: string;
  hours: number[];
}

export interface Event {
  eventID: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  suggestedBy: string;
  userIDs?: string[];
  groupIDs?: string[];
}
