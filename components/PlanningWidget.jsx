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

  const renderHours = () => {
    return weekdays.map((day, dayIndex) => (
      <View key={dayIndex} style={styles.dayHourColumn}>
        {Array(HOURS_IN_A_DAY)
          .fill(0)
          .map((_, hour) => {
            const date = getDateFromDay(day);
            const hasData = availability.find(
              (item) => item.date === date && item.hour === hour
            );
            return (
              <TouchableOpacity
                key={`${dayIndex}-${hour}`}
                style={[
                  styles.hourCell,
                  hasData
                    ? hasData.included
                      ? styles.green
                      : styles.red
                    : styles.emptyCell,
                ]}
              >
                <Text style={styles.hourText}>{hour}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    ));
  };

  const renderGridContainer = () => {
    return (
      <View style={[styles.gridContainer, { flexDirection: "column" }]}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.dayColumn, styles.bufferCell]}>
            <Text>&#8203;&#8203;</Text>
          </View>
          {weekdays.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.weekdaysCell}>{day.substring(0, 3)}</Text>
            </View>
          ))}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scroll
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.hourColumn}>
              {Array(HOURS_IN_A_DAY)
                .fill(0)
                .map((_, hour) => (
                  <Text key={hour} style={styles.lefthourCell}>
                    {hour}
                  </Text>
                ))}
            </View>
            {renderHours()}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextStyle}>Complete Planning</Text>
          </TouchableOpacity>
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
