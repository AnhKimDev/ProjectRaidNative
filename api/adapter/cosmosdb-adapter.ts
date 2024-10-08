import axios from "axios";

const getyyyymmdd = (date: Date) => {
  if (!(date instanceof Date)) {
    throw new Error(`Invalid date object: ${date}`);
  }
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

class CosmosdbAdapter {
  adapter: any;
  constructor() {
    this.adapter = axios.create({
      baseURL: "http://10.0.2.2:5050/v1/",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAvailabilityByUser(userID: string, startDate: Date, endDate: Date) {
    const startDateIso = getyyyymmdd(startDate);
    const endDateIso = getyyyymmdd(endDate);
    const response = await this.adapter.post(
      "/availability/getAvailabilityByUser",
      {
        userID,
        startDate: startDateIso,
        endDate: endDateIso,
      }
    );
    return response.data;
  }

  async getAvailabilityByGroup(groupID: number, date: Date) {
    const DateISO = getyyyymmdd(date);
    const response = await this.adapter.post(
      "/availability/getAvailabilityByGroup",
      {
        groupID,
        DateISO,
      }
    );
    return response.data;
  }

  async getGroupByGroupID(groupID: string) {
    const response = await this.adapter.post("/groups/getGroupByGroupID", {
      groupID,
    });
    return response.data;
  }

  async getGroupsByUserID(userID: string) {
    const response = await this.adapter.post("/groups/getGroupsByUserID", {
      userID,
    });
    return response.data;
  }

  async getUserByUserID(userID: number) {
    const response = await this.adapter.post("/groups/getUserByUserID", {
      userID,
    });
    return response.data;
  }

  async getEventByEventID(eventID: string): Promise<Event> {
    const response = await this.adapter.post("/events/getEventByEventID", {
      eventID,
    });
    return response.data;
  }

  async getEvents(): Promise<Event[]> {
    const response = await this.adapter.post("/events/getEvents", {});
    return response.data;
  }

  async updateAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: { [dateIso: string]: number[] }
  ): Promise<void> {
    const availabilityData = Object.keys(hours).map((dateIso) => ({
      userID,
      date: dateIso,
      hours: hours[dateIso],
    }));

    try {
      const response = await this.adapter.post("/updateAvailabilityByUser  ", {
        availabilityData,
      });
      console.log("Availability updated successfully");
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  }
}

const CosmosdbAdapterInstance = new CosmosdbAdapter();
export default CosmosdbAdapterInstance;
