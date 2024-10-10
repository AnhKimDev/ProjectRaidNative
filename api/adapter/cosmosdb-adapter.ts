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
        date: DateISO,
      }
    );

    console.log(response.data);

    // Assuming the backend returns an array of availability objects
    const availabilityData = response.data;

    // Filter and transform the data to match the local method's return structure
    return availabilityData
      .filter((availability) => availability.date === DateISO)
      .map(({ userID, date, hours }) => ({
        userID,
        date,
        hours,
      }));
  }

  async getGroupByGroupID(groupID: string) {
    const response = await this.adapter.post("/group/getGroupByGroupID", {
      groupID,
    });
    return response.data;
  }

  async getGroupsByUserID(userID: string) {
    const response = await this.adapter.post("/group/getGroupsByUserID", {
      userID,
    });
    return response.data;
  }

  async getUsersByGroupIDs(groupIDs: string) {
    const response = await this.adapter.post("/group/getUsersByGroupIDs", {
      groupIDs,
    });
    return response.data;
  }

  async getUserByUserID(userID: string) {
    const response = await this.adapter.post("/user/getUserByUserID", {
      userID,
    });
    return response.data;
  }

  async getEventByEventID(eventID: string): Promise<Event> {
    const response = await this.adapter.post("/event/getEventByEventID", {
      eventID,
    });
    return response.data;
  }

  async getEventsByUserID(userID: string): Promise<Event> {
    try {
      const response = await this.adapter.post("/event/getEventsByUserID", {
        userID,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting events by user ID:", error);
    }
  }

  async getEvents(): Promise<Event[]> {
    const response = await this.adapter.post("/event/getEvents", {});
    return response.data;
  }

  addAvailabilityItem(hours: { [hour: string]: boolean }): number[] {
    const newHours = Object.keys(hours)
      .filter((hour) => hours[hour])
      .map(Number);
    return newHours;
  }

  removeAvailabilityItem(existingHours: number[], hours: number[]): number[] {
    const newHours = existingHours.filter((hour) => !hours.includes(hour));
    return newHours;
  }

  compareAndSyncHours(
    existingHours: number[],
    hours: { [hour: string]: boolean }
  ): number[] {
    const newHours = existingHours.slice();

    Object.keys(hours).forEach((hour) => {
      const hourNum = parseInt(hour);
      if (hours[hour]) {
        if (!newHours.includes(hourNum)) {
          newHours.push(hourNum);
        } else {
          const index = newHours.indexOf(hourNum);
          newHours.splice(index, 1);
        }
      }
    });

    return newHours;
  }

  async updateAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: { [dateIso: string]: { [hour: string]: boolean } }
  ): Promise<void> {
    const startDateIso = getyyyymmdd(startDate);
    const endDateIso = getyyyymmdd(endDate);

    try {
      let availabilityData = await this.getAvailabilityByUser(
        userID,
        startDate,
        endDate
      );

      // Manipulate availabilityData
      console.log("Iterating over hours...");
      Object.keys(hours).forEach((dateIso) => {
        console.log("Processing dateIso:", dateIso);
        let existingItemIndex = availabilityData.findIndex(
          (item) => item.date === dateIso && item.userID === userID
        );

        if (dateIso >= startDateIso && dateIso <= endDateIso) {
          console.log("DateIso is within range");
          if (existingItemIndex !== -1) {
            console.log("Existing item found");
            const existingItem = availabilityData[existingItemIndex];
            existingItem.hours = this.compareAndSyncHours(
              existingItem.hours,
              hours[dateIso]
            );
          } else {
            console.log("No existing item found, creating new one");
            const newHours = this.addAvailabilityItem(hours[dateIso]);
            const newItem = {
              userID,
              date: dateIso,
              hours: newHours,
            };
            availabilityData.push(newItem);
          }
        } else {
          console.log("DateIso is out of range");
          if (existingItemIndex !== -1) {
            availabilityData.splice(existingItemIndex, 1);
          }
        }
      });

      console.log("Updated availability data:", availabilityData);

      // Send the updated availabilityData to the backend
      await this.adapter.post("/availability/updateAvailabilityByUser ", {
        availabilityData,
      });

      console.log("updateAvailabilityByUser successfull");
    } catch (error) {
      console.error("Error updateAvailabilityByUser:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async updateAvailabilityByGroup(
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: {
      [userID: string]: { [hour: string]: boolean };
    }
  ) {
    try {
      for (const userID in usersAvailability) {
        const userHours = { [dateIso]: usersAvailability[userID] };
        await this.updateAvailabilityByUser(
          userID,
          startDate,
          endDate,
          userHours
        );
      }
      console.log("updateAvailabilityByGroup  successfull");
    } catch (error) {
      console.error("Error updating updateAvailabilityByGroup:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
}

const CosmosdbAdapterInstance = new CosmosdbAdapter();
export default CosmosdbAdapterInstance;
