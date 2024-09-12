import React from "react";
import { View, Text } from "react-native";
import styles from "./SummaryStyles";

const Summary = ({ availability, calculateSummary }) => {
  const { startTime, endTime, timeslots } = calculateSummary();

  return (
    <View style={styles.summaryContainer}>
      {availability.length > 0 ? (
        <>
          <Text style={[styles.summaryText]}>
            Starting Time: {startTime} - End Time: {endTime}
          </Text>
          <Text style={[styles.summaryText]}>
            Available Time Slots: {timeslots}
          </Text>
        </>
      ) : (
        <Text style={[styles.summaryText]}>
          No availability data found for this date.
        </Text>
      )}
    </View>
  );
};

export default Summary;
