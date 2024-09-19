import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "./PlanningWidgetStyles";
import MockDatabaseAdapter from "../../api/adapter/mock-database-adapter";

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
  userID: "user-1",
  name: "User 1",
  image: "",
};
const HOURS_IN_A_DAY = 24;

const PlanningWidget = () => {
  const [date, setDate] = useState(() => new Date(Date.now()));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedHoursState, setSelectedHoursState] = useState({});
  const [availability, setAvailability] = useState([]);

  //on startup update header
  useEffect(() => {
    const monday = getDateFromDay("Monday");
    const sunday = getDateFromDay("Sunday");
    setStartDate(new Date(monday));
    setEndDate(new Date(sunday));
  }, []); // empty dependency array to run only on mount

  const getAvailabilityStatus = (date, hour) => {
    const formattedDate = getDateFromDay(date);
    const isSelected =
      selectedHoursState[formattedDate] &&
      selectedHoursState[formattedDate][hour.toString()];
    const includedHour =
      availability.find((item) => item.date === formattedDate) &&
      Array.isArray(
        availability.find((item) => item.date === formattedDate).hours
      ) &&
      availability
        .find((item) => item.date === formattedDate)
        .hours.includes(hour);
    return isSelected
      ? styles.yellow // Return yellow if the hour is selected
      : includedHour
        ? styles.green // Return green if the hour is included in the availability data
        : styles.red; // Return red by default
  };

  const handleHourPress = (day, hour) => {
    const formattedDate = getDateFromDay(day);
    setSelectedHoursState((prevSelectedHours) => {
      const existingHours = { ...(prevSelectedHours[formattedDate] || {}) };
      if (existingHours[hour.toString()]) {
        delete existingHours[hour.toString()];
      } else {
        existingHours[hour.toString()] = true;
      }
      return { ...prevSelectedHours, [formattedDate]: existingHours };
    });
  };
  const handleHourRowPress = (hour) => {
    weekdays.forEach((day) => {
      handleHourPress(day, hour);
    });
  };

  useEffect(() => {
    MockDatabaseAdapter.getAvailabilityByUser(
      user.userID,
      startDate,
      endDate
    ).then((availability) => {
      setAvailability(availability);
    });
  }, [startDate, endDate]);

  const getDateFromDay = (day) => {
    const date = new Date(startDate.getTime());
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const dayIndex = weekdays.indexOf(day);
    const monday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    date.setDate(monday + dayIndex);
    return date.toISOString().split("T")[0];
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
    const newSelectedHours = {};
    Object.keys(selectedHoursState).forEach((date) => {
      const dateObject = new Date(date);
      if (dateObject >= newStartDate && dateObject <= newEndDate) {
        newSelectedHours[date] = selectedHoursState[date];
      }
    });
    setSelectedHoursState(newSelectedHours);
  };

  const handlePrevDate = () => {
    const newStartDate = new Date(
      startDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const newEndDate = new Date(
      newStartDate.getTime() + 6 * 24 * 60 * 60 * 1000
    );
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    const newSelectedHours = {};
    Object.keys(selectedHoursState).forEach((date) => {
      const dateObject = new Date(date);
      if (dateObject >= newStartDate && dateObject <= newEndDate) {
        newSelectedHours[date] = selectedHoursState[date];
      }
    });
    setSelectedHoursState(newSelectedHours);
  };

  const handleUpdate = () => {
    console.log("handleUpdate called");
    console.log("selectedHoursState:", selectedHoursState);
    const updatedSelectedHours = {};
    Object.keys(selectedHoursState).forEach((date) => {
      const selectedHoursForDate = selectedHoursState[date];
      const newSelectedHoursForDate = {};
      Object.keys(selectedHoursForDate).forEach((hour) => {
        newSelectedHoursForDate[hour] = selectedHoursForDate[hour];
      });
      updatedSelectedHours[date] = newSelectedHoursForDate;
    });
    //console.log("updatedSelectedHours:", updatedSelectedHours);
    console.log(
      "plan 138:",
      user.userID,
      startDate,
      endDate,
      updatedSelectedHours
    );
    MockDatabaseAdapter.updateAvailabilityByUser(
      user.userID,
      startDate,
      endDate,
      updatedSelectedHours
    ).then(() => {
      // Reset the selected hours state
      setSelectedHoursState({});
      // Fetch the updated availability data
      MockDatabaseAdapter.getAvailabilityByUser(
        user.userID,
        startDate,
        endDate
      ).then((availability) => {
        setAvailability(availability);
      });
    });
  };

  const handleReset = () => {
    setSelectedHoursState({});
  };

  const renderHeader = (date, handlePrevDate, handleNextDate) => {
    const startDayOfWeek =
      startDate.getDate() -
      startDate.getDay() +
      (startDate.getDay() === 0 ? 7 : 1);
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const startYear = startDate.getFullYear();
    const endMonth = endDate.toLocaleString("default", { month: "short" });
    const endDay = endDate.getDate();
    const endYear = endDate.getFullYear();
    const weekRange = `${startMonth} ${startDayOfWeek}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
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
    return weekdays.map((day, dayIndex) => {
      return (
        <View key={dayIndex} style={styles.dayHourColumn}>
          {Array(HOURS_IN_A_DAY)
            .fill(0)
            .map((_, hour) => {
              return (
                <TouchableOpacity
                  key={`${dayIndex}-${hour}`}
                  style={[styles.hourCell, getAvailabilityStatus(day, hour)]}
                  onPress={() => handleHourPress(day, hour)}
                >
                  <Text style={styles.hourText}>{hour}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      );
    });
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
                  <View style={styles.lefthourCell}>
                    <TouchableOpacity>
                      <Text
                        key={hour}
                        style={styles.lefthourCell}
                        onPress={() => handleHourRowPress(hour)}
                      >
                        {hour}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            {renderHours()}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonTextStyle}>Reset Selection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonTextStyle}>Confirm Selection</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader(date, handlePrevDate, handleNextDate)}
      <View style={{ height: 20 }} />
      {renderGridContainer()}
    </View>
  );
};
export default PlanningWidget;
