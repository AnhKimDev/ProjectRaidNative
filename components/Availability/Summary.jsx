import React from "react";
import { View, Text } from "react-native";
import styles from "./SummaryStyles";

const Summary = ({ availability, calculateSummary }) => {
  const formatTime = (date) => {
    if (!date) {
      return "N/A";
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const { startTime, endTime, timeslots } = calculateSummary();

  return (
    <View style={styles.summaryContainer}>
      <Text style={[styles.summaryText]}>
        Starting Time: {formatTime(startTime)} - End Time: {formatTime(endTime)}
      </Text>
      <Text style={[styles.summaryText]}>
        Available Time Slots: {timeslots}
      </Text>
    </View>
  );
};

export default Summary;
