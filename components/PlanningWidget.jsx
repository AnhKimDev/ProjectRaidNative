import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./PlanningWidgetStyles";
import { users, availability } from "./data";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HOURS_IN_A_DAY = 24;

const getDateFromDay = (day) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayIndex = weekdays.indexOf(day);
  const diff = dayIndex - dayOfWeek;
  date.setDate(date.getDate() + diff);
  return date.toISOString().split("T")[0];
};

const PlanningWidget = () => {
  const [date, setDate] = useState(new Date());
  const handlePrevDate = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  const handleNextDate = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const renderHeader = (date, handlePrevDate, handleNextDate) => {
    const startDate = date.toLocaleDateString();
    const endDate = new Date(
      date.setDate(date.getDate() + 6)
    ).toLocaleDateString();
    const weekRange = `${startDate} - ${endDate}`;

    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevDate}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{weekRange}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextDate}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderGridContainer = () => {
    return (
      <View style={styles.gridContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.bufferCell}>
            <Text></Text>
          </View>
          {weekdays.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.lefthourCell}>{day.substring(0, 3)}</Text>
            </View>
          ))}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scroll
        >
          {Array(HOURS_IN_A_DAY)
            .fill(0)
            .map((_, hourIndex) => {
              return (
                <View key={hourIndex} style={{ flexDirection: "row" }}>
                  <View style={styles.hourCellLeft}>
                    <Text style={styles.lefthourCell}>{hourIndex}</Text>
                  </View>
                  {weekdays.map((day, dayIndex) => {
                    const date = getDateFromDay(day);
                    const dayAvailability = availability.find(
                      (availabilityItem) => availabilityItem.date === date
                    );
                    return (
                      <View key={dayIndex} style={styles.hourCell}>
                        {/* Add content for each cell here */}
                      </View>
                    );
                  })}
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextStyle}>Complete Planning</Text>
          </TouchableOpacity>
          {/* Add more buttons as needed */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader(date, handlePrevDate, handleNextDate)}
      {renderGridContainer()}
    </View>
  );
};

export default PlanningWidget;
