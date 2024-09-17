// api.ts
interface Api {
  // Availability API methods
  getAvailabilityByUser(
    userID: number,
    startDate: Date,
    endDate: Date
  ): Promise<Availability[]>;
  getAvailabilityByGroup(groupID: number, date: Date): Promise<Availability[]>;
  updateAvailabilityByUser(
    userID: number,
    startDate: Date,
    endDate: Date,
    hours: Hours
  ): Promise<void>;
  updateAvailabilityByGroup(
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: Availability
  ): Promise<void>;

  // Groups API methods
  getGroup(groupID: number): Promise<Group>;
  createGroup(groupName: string): Promise<void>;
  updateGroup(groupID: number, groupName: string): Promise<void>;
  deleteGroup(groupID: number): Promise<void>;

  // Users API methods
  getUser(userID: number): Promise<User>;
  createUser(userName: string): Promise<void>;
  updateUser(userID: number, userName: string): Promise<void>;
  deleteUser(userID: number): Promise<void>;
}

interface Group {
  groupID: string;
  name: string;
  userIds: string[];
}

interface User {
  userId: string;
  name: string;
  image: string;
}

interface Availability {
  date: string;
  userID: string;
  hours: number[];
}

interface Hours {
  hour: number;
}

interface UserIDs {
  userID: number;
}
