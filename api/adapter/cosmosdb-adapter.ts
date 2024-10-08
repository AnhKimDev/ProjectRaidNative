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
      baseURL: "http://localhost:5050/v1",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getAvailabilityByUser(userID: string, startDate: Date, endDate: Date) {
    const startDateIso = getyyyymmdd(startDate);
    const endDateIso = getyyyymmdd(endDate);
    const response = this.adapter.post("/availability/getAvailabilityByUser", {
      userID,
      startDateIso,
      endDateIso,
    });
    return response.data;
  }

  async getAvailabilityByGroup(groupID: number, date: Date) {
    const DateISO = getyyyymmdd(date);
    const response = this.adapter.post("/availability/getAvailabilityByGroup", {
      groupID,
      DateISO,
    });
    return response.data;
  }
}

const CosmosdbAdapterInstance = new CosmosdbAdapter();
export default CosmosdbAdapterInstance;
