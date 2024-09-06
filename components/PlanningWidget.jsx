import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./PlanningWidgetStyles";
import { availability as availabilityData } from "./data";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
user = {
  userId: "user-1",
  name: "User 1",
  image: "",
};
const HOURS_IN_A_DAY = 24;

const PlanningWidget = () => {
  const [date, setDate] = useState(() => new Date(Date.now()));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedHours, setSelectedHours] = useState({});

  const handleHourPress = (day, hour) => {
    const date = getDateFromDay(day);
    const existingHours = selectedHours[date] || [];
    if (existingHours.includes(hour)) {
      existingHours.splice(existingHours.indexOf(hour), 1);
    } else {
      existingHours.push(hour);
    }
    setSelectedHours({ ...selectedHours, [date]: existingHours });
  };

  useEffect(() => {
    const startDate = new Date(getDateFromDay("Monday", date));
    const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(endDate);
    console.log("availabilitydata length:", availabilityData.length);
    const filteredAvailability = availabilityData.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        item.userId === user.userId &&
        itemDate &&
        itemDate >= startDate &&
        itemDate <= endDate
      );
    });
    setAvailability(filteredAvailability);
    console.log("filtered availability:", filteredAvailability);
  }, [date]);

  const getDateFromDay = (day) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const dayIndex = weekdays.indexOf(day);
    const monday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    date.setDate(monday + dayIndex);
    return date.toISOString().split("T")[0];
  };

  const handlePrevDate = () => {
    const newStartDate = new Date(
      startDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const newEndDate = new Date(
      newStartDate.getTime() - 6 * 24 * 60 * 60 * 1000
    );
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleNextDate = () => {
    const newStartDate = new Date(
      startDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const newEndDate = new Date(
      newStartDate.getTime() + 6 * 24 * 60 * 60 * 1000
    );
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const renderHeader = (date, handlePrevDate, handleNextDate) => {
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear();
    const endMonth = endDate.toLocaleString("default", { month: "short" });
    const endDay = endDate.getDate();
    const endYear = endDate.getFullYear();
    const weekRange = `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
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
            const hasData = availability.find((item) => item.date === date);
            const includedHour = hasData && hasData.hours.includes(hour);
            const isSelected =
              selectedHours[date] && selectedHours[date].includes(hour);
            return (
              <TouchableOpacity
                key={`${dayIndex}-${hour}`}
                style={[
                  styles.hourCell,
                  includedHour
                    ? styles.green
                    : isSelected
                      ? styles.green
                      : styles.red,
                ]}
                onPress={() => handleHourPress(day, hour)}
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
