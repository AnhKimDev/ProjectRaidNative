import { CosmosClient } from "@azure/cosmos";
import { groups, users, availability, events } from "./mockData.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;
const databaseId = process.env.COSMOSDB_DATABASE_ID;
const containerId = process.env.COSMOSDB_CONTAINER_ID;

// Create a new CosmosClient instance
const client = new CosmosClient({ endpoint, key });

// Create a new database
const databaseDefinition = {
  id: "my-database",
};

client.databases
  .createIfNotExists(databaseDefinition)
  .then((databaseResponse) => {
    console.log(`Database created: ${databaseResponse.database.id}`);

    // Create containers
    const containers = [
      {
        id: "Availability",
        partitionKey: {
          paths: ["/userID"],
        },
      },
      {
        id: "Groups",
        partitionKey: {
          paths: ["/groupID"],
        },
      },
      {
        id: "Users",
        partitionKey: {
          paths: ["/userID"],
        },
      },
      {
        id: "Events",
        partitionKey: {
          paths: ["/eventID"],
        },
      },
    ];

    containers.forEach((containerDefinition) => {
      client
        .database("my-database")
        .containers.createIfNotExists(containerDefinition)
        .then((containerResponse) => {
          console.log(`Container created: ${containerResponse.container.id}`);

          // Create items in the container using mockData
          let data;
          switch (containerDefinition.id) {
            case "Availability":
              data = availability;
              break;
            case "Groups":
              data = groups;
              break;
            case "Users":
              data = users;
              break;
            case "Events":
              data = events;
              break;
            default:
              throw new Error(`Unknown container: ${containerDefinition.id}`);
          }

          data.forEach((item) => {
            client
              .database("my-database")
              .container(containerDefinition.id)
              .items.upsert(item)
              .then((response) => {
                console.log(`Item created: ${response.item.id}`);
              })
              .catch((error) => {
                console.error(`Error creating item: ${error}`);
              });
          });
        })
        .catch((error) => {
          console.error(`Error creating container: ${error}`);
        });
    });
  })
  .catch((error) => {
    console.error(`Error creating database: ${error}`);
  });
