import CosmosdbAdapterInstance from "./cosmosdb-adapter";

const adapter = CosmosdbAdapterInstance;

const userID = "user-1";
const startDate = new Date("2024-09-30");
const endDate = new Date("2024-10-06");

/* adapter
  .getAvailabilityByUser(userID, startDate, endDate)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  }); */
