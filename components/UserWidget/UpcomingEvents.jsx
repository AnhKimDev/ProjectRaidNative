// components/UpcomingEvents.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./UpcomingEventsStyles";

const events = [
  { id: 1, title: "Event 1", date: "2023-03-01" },
  { id: 2, title: "Event 2", date: "2023-03-05" },
  { id: 3, title: "Event 3", date: "2023-03-10" },
  // Add more events here...
];

const UpcomingEvents = () => {
  return (
    <View style={styles.upcomingEventsContainer}>
      <Text style={styles.upcomingEventsTitle}>Upcoming Events</Text>
      <ScrollView>
        {events.map((item) => (
          <View key={item.id} style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingEvents;
