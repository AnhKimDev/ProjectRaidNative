import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./UpcomingEventsStyles";
import MockDatabaseAdapter from "../../api/adapter/mock-database-adapter";
import CosmosdbAdapterInstance from "../../api/adapter/cosmosdb-adapter";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState({}); // Initialize an empty object

  const userID = "user-1";
  useEffect(() => {
    console.log("userwidget: upcoming events - useeffect");
    const fetchEvents = async () => {
      console.log("trying to fetch events...");
      const eventsFromAdapter =
        await CosmosdbAdapterInstance.getEventsByUserID(userID);
      console.log("events fetched successfully");

      setEvents(eventsFromAdapter);

      const initialIsDetailsOpen = eventsFromAdapter.reduce(
        (acc, event) => ({ ...acc, [event.eventID]: false }),
        {}
      );
      setIsDetailsOpen(initialIsDetailsOpen);
    };
    fetchEvents();
  }, []);

  const handleToggleDetails = (eventID) => {
    setIsDetailsOpen((prevIsDetailsOpen) => ({
      ...prevIsDetailsOpen,
      [eventID]: !prevIsDetailsOpen[eventID],
    }));
  };

  return (
    <View>
      <Text style={styles.upcomingEventsTitle}>Upcoming Events</Text>
      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.eventID}
            style={styles.eventItem}
            onPress={() => handleToggleDetails(event.eventID)}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.eventTitle}>{event.title}</Text>

              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text
                  style={styles.eventTime}
                >{`${event.startTime} - ${event.endTime}`}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              {isDetailsOpen[event.eventID] ? (
                <View style={styles.eventDetailsExtension}>
                  <Text>Description: {event.description}</Text>
                  <Text>Suggested by: {event.suggestedBy}</Text>
                  <Text>User IDs: {event.userIDs.join(", ")}</Text>
                  <Text>Group IDs: {event.groupIDs.join(", ")}</Text>
                </View>
              ) : (
                <View style={styles.eventDetailsExtension} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingEvents;
